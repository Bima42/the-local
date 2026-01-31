import json
from pathlib import Path
from typing import Any, Dict, List
from collections import defaultdict
import tiktoken

class JSONAnalyzer:
    
    def __init__(self, json_path: str):
        self.json_path = Path(json_path)
        self.data = None
        self.encoder = tiktoken.get_encoding("cl100k_base")
        
    def load_json(self) -> bool:
        try:
            with open(self.json_path, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
            print(f"✓ JSON loaded: {self.json_path.name}\n")
            return True
        except Exception as e:
            print(f"✗ Error loading JSON: {e}")
            return False
    
    def count_tokens(self, obj: Any) -> int:
        return len(self.encoder.encode(json.dumps(obj)))
    
    def get_type_description(self, obj: Any) -> str:
        if isinstance(obj, dict):
            return "object"
        elif isinstance(obj, list):
            return f"array[{len(obj)}]"
        elif isinstance(obj, str):
            return "string"
        elif isinstance(obj, bool):
            return "boolean"
        elif isinstance(obj, int):
            return "integer"
        elif isinstance(obj, float):
            return "number"
        elif obj is None:
            return "null"
        else:
            return type(obj).__name__
    
    def extract_schema(self, obj: Any, path: str = "root") -> Dict:
        
        if isinstance(obj, dict):
            schema = {"type": "object", "properties": {}}
            for key, value in obj.items():
                schema["properties"][key] = self.extract_schema(value, f"{path}.{key}")
            return schema
            
        elif isinstance(obj, list):
            schema = {"type": "array", "length": len(obj)}
            if len(obj) > 0:
                all_keys = set()
                if isinstance(obj[0], dict):
                    for item in obj:
                        if isinstance(item, dict):
                            all_keys.update(item.keys())
                    schema["item_schema"] = self.extract_schema(obj[0], f"{path}[0]")
                    schema["all_keys_in_items"] = sorted(list(all_keys))
                else:
                    schema["item_type"] = self.get_type_description(obj[0])
            return schema
            
        else:
            return {"type": self.get_type_description(obj)}
    
    def print_schema(self, schema: Dict, indent: int = 0, name: str = "root"):
        
        prefix = "  " * indent
        
        if schema["type"] == "object":
            print(f"{prefix}{name}: {{")
            for prop_name, prop_schema in schema.get("properties", {}).items():
                self.print_schema(prop_schema, indent + 1, prop_name)
            print(f"{prefix}}}")
            
        elif schema["type"] == "array":
            length = schema.get("length", 0)
            print(f"{prefix}{name}: [ // {length} items")
            
            if "item_schema" in schema:
                self.print_schema(schema["item_schema"], indent + 1, "item")
            elif "item_type" in schema:
                print(f"{prefix}  {schema['item_type']}")
            
            if "all_keys_in_items" in schema and len(schema["all_keys_in_items"]) > 0:
                all_keys = schema["all_keys_in_items"]
                item_props = schema.get("item_schema", {}).get("properties", {}).keys()
                missing_keys = set(all_keys) - set(item_props)
                if missing_keys:
                    print(f"{prefix}  // Note: Some items also have: {', '.join(sorted(missing_keys))}")
            
            print(f"{prefix}]")
            
        else:
            print(f"{prefix}{name}: {schema['type']}")
    
    def analyze_root_structure(self) -> Dict:
        
        if not self.data or not isinstance(self.data, dict):
            return {}
        
        root_analysis = {}
        
        for key, value in self.data.items():
            tokens = self.count_tokens(value)
            type_desc = self.get_type_description(value)
            
            root_analysis[key] = {
                "type": type_desc,
                "tokens": tokens
            }
            
            if isinstance(value, list):
                root_analysis[key]["length"] = len(value)
        
        return root_analysis
    
    def analyze_array_fields(self, array_data: List[Dict], array_name: str) -> Dict:
        
        if not array_data or not isinstance(array_data, list):
            return {}
        
        total_items = len(array_data)
        field_stats = {}
        all_fields = set()
        
        for item in array_data:
            if isinstance(item, dict):
                all_fields.update(item.keys())
        
        for field in all_fields:
            field_stats[field] = {
                "count": 0,
                "total_tokens": 0,
                "types": set(),
            }
        
        for item in array_data:
            if isinstance(item, dict):
                for field in all_fields:
                    if field in item:
                        value = item[field]
                        field_stats[field]["count"] += 1
                        field_stats[field]["total_tokens"] += self.count_tokens(value)
                        field_stats[field]["types"].add(self.get_type_description(value))
        
        for field in field_stats:
            stats = field_stats[field]
            stats["presence_rate"] = (stats["count"] / total_items) * 100
            stats["avg_tokens"] = stats["total_tokens"] / stats["count"] if stats["count"] > 0 else 0
            stats["types"] = list(stats["types"])
        
        return {
            "array_name": array_name,
            "total_items": total_items,
            "field_stats": field_stats,
            "all_fields": sorted(list(all_fields))
        }
    
    def print_root_breakdown(self, root_analysis: Dict, total_tokens: int):
        
        print("\n" + "="*90)
        print("ROOT LEVEL STRUCTURE BREAKDOWN")
        print("="*90)
        
        print(f"\n{'Field':<30} {'Type':<20} {'Tokens':<15} {'Percentage'}")
        print("-"*90)
        
        sorted_root = sorted(root_analysis.items(), key=lambda x: x[1]['tokens'], reverse=True)
        
        for key, info in sorted_root:
            type_str = info['type']
            if 'length' in info:
                type_str += f" ({info['length']} items)"
            
            tokens = info['tokens']
            percentage = (tokens / total_tokens * 100) if total_tokens > 0 else 0
            
            print(f"{key:<30} {type_str:<20} {tokens:>13,}  {percentage:>6.1f}%")
    
    def print_array_field_analysis(self, analysis: Dict):
        
        print("\n" + "="*90)
        print(f"{analysis['array_name'].upper()} FIELDS ANALYSIS")
        print("="*90)
        
        print(f"\nTotal items: {analysis['total_items']}")
        print(f"Unique fields: {len(analysis['all_fields'])}")
        
        print("\n" + "-"*90)
        print(f"{'Field':<35} {'Type':<15} {'Present':<12} {'Avg Tokens':<12} {'Total Tokens'}")
        print("-"*90)
        
        sorted_fields = sorted(
            analysis['field_stats'].items(),
            key=lambda x: x[1]['total_tokens'],
            reverse=True
        )
        
        for field, stats in sorted_fields:
            field_name = field[:33] + ".." if len(field) > 35 else field
            type_str = stats['types'][0] if len(stats['types']) == 1 else "mixed"
            type_str = type_str[:13] + ".." if len(type_str) > 15 else type_str
            presence = f"{stats['count']}/{analysis['total_items']}"
            presence_pct = f"({stats['presence_rate']:.0f}%)"
            presence_str = f"{presence} {presence_pct}"
            
            print(f"{field_name:<35} {type_str:<15} {presence_str:<12} {stats['avg_tokens']:>10.1f}  {stats['total_tokens']:>13,}")
    
    def print_token_recommendations(self, analysis: Dict):
        
        print("\n" + "="*90)
        print(f"TOKEN OPTIMIZATION - {analysis['array_name'].upper()}")
        print("="*90)
        
        field_stats = analysis['field_stats']
        total_items = analysis['total_items']
        
        always_present = []
        sometimes_present = []
        heavy_fields = []
        
        for field, stats in field_stats.items():
            if stats['count'] == total_items:
                always_present.append((field, stats['avg_tokens'], stats['total_tokens']))
            else:
                sometimes_present.append((field, stats['count'], stats['presence_rate']))
            
            if stats['avg_tokens'] > 500:
                heavy_fields.append((field, stats['avg_tokens'], stats['total_tokens']))
        
        total_tokens = sum(stats['total_tokens'] for stats in field_stats.values())
        
        if always_present:
            print("\n✅ ALWAYS PRESENT FIELDS (100%):")
            print("-"*90)
            
            cumulative = 0
            for field, avg_tokens, total in sorted(always_present, key=lambda x: x[2], reverse=True):
                cumulative += total
                cumulative_pct = (cumulative / total_tokens * 100) if total_tokens > 0 else 0
                pct = (total / total_tokens * 100) if total_tokens > 0 else 0
                print(f"  • {field:<35} {avg_tokens:>8.1f} tok/item  {total:>10,} ({pct:>4.1f}%)  [cum: {cumulative_pct:>5.1f}%]")
        
        if sometimes_present:
            print("\n⚠️  OPTIONAL FIELDS:")
            print("-"*90)
            for field, count, pct in sorted(sometimes_present, key=lambda x: x[2]):
                print(f"  • {field:<40} {count:>3}/{total_items} ({pct:>5.1f}%)")
        
        if heavy_fields:
            print("\n🔴 HIGH TOKEN FIELDS (>500 tokens/item):")
            print("-"*90)
            for field, avg, total in sorted(heavy_fields, key=lambda x: x[2], reverse=True):
                pct = (total / total_tokens * 100) if total_tokens > 0 else 0
                print(f"  • {field:<38} {avg:>8.1f} tok/item  {total:>10,} ({pct:>4.1f}%)")
        
        print(f"\n📊 Total tokens in {analysis['array_name']}: {total_tokens:,}")
        print(f"📊 Average tokens per item: {total_tokens / total_items:,.1f}")
    
    def run_analysis(self):
        
        if not self.load_json():
            return
        
        total_tokens = self.count_tokens(self.data)
        
        print("="*90)
        print("JSON STRUCTURE ANALYSIS")
        print("="*90)
        print(f"\nTotal tokens: {total_tokens:,}\n")
        
        print("="*90)
        print("SCHEMA STRUCTURE")
        print("="*90)
        print()
        
        schema = self.extract_schema(self.data)
        self.print_schema(schema)
        
        root_analysis = self.analyze_root_structure()
        if root_analysis:
            self.print_root_breakdown(root_analysis, total_tokens)
        
        if isinstance(self.data, dict):
            for key, value in self.data.items():
                if isinstance(value, list) and len(value) > 0 and isinstance(value[0], dict):
                    array_analysis = self.analyze_array_fields(value, key)
                    if array_analysis:
                        self.print_array_field_analysis(array_analysis)
                        self.print_token_recommendations(array_analysis)
        
        print("\n" + "="*90)
        print("END OF ANALYSIS")
        print("="*90 + "\n")


def main():
    JSON_FILE_PATH = "./data/place-details-google.json"

    analyzer = JSONAnalyzer(JSON_FILE_PATH)
    analyzer.run_analysis()


if __name__ == "__main__":
    main()