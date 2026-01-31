# Planning: Application de Mapping de Douleurs sur Modèle 3D Humain

## Situation Actuelle

**Projet:** Application hackathon pour visualiser et documenter des douleurs corporelles via un modèle 3D interactif.

**Stack existante:**
- Next.js 16 avec `next-intl` configuré
- Drizzle ORM (à configurer)
- Tailwind v4 avec design tokens de base

**État:** Projet vierge, configuration de base uniquement.

---

## Le Problème qu'on Résout

Permettre à un utilisateur de **localiser précisément ses douleurs** sur un modèle anatomique 3D, puis de les **documenter** avec des labels et (plus tard) via conversation vocale.

---

## Architecture Proposée

### Flow Utilisateur (MVP)

```
Landing → [Créer nouvelle session] → Écran 3D avec modèle humain
                                           ↓
                                    Clic sur le corps
                                           ↓
                                    Pin apparaît + Modal label
                                           ↓
                                    Saisie texte → Sauvegarde
```

### Structure de Fichiers Cible

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Landing
│   │   ├── session/
│   │   │   ├── new/page.tsx      # Crée session → redirige
│   │   │   └── [id]/page.tsx     # Vue 3D principale
│   │   └── layout.tsx
├── components/
│   ├── body-model/
│   │   ├── BodyViewer.tsx        # Wrapper R3F + Canvas
│   │   ├── HumanModel.tsx        # Le mesh 3D
│   │   ├── PainPin.tsx           # Composant pin 3D
│   │   └── PinLabel.tsx          # UI label (HTML overlay)
│   └── ui/                       # shadcn components
├── lib/
│   ├── db/
│   │   ├── index.ts              # Drizzle client
│   │   └── schema.ts             # Tables
│   └── stores/
│       └── pain-session.ts       # Zustand store
└── server/
    └── actions/
        └── session-actions.ts    # Server actions
```

---

## Choix Techniques Clés

### 1. Rendu 3D: React Three Fiber + Drei

```bash
pnpm add three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

**Pourquoi:** Intégration React native, `Drei` simplifie énormément (OrbitControls, Html overlays, etc.)

**Modèle 3D:** Partir sur un `.glb` simple d'un humain (ex: Mixamo, Sketchfab free). On peut commencer avec une capsule placeholder.

### 2. Système de Pins

Les pins seront stockés avec des **coordonnées 3D** (x, y, z) relatives au modèle:

```ts
// Concept de détection du clic
const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
  event.stopPropagation()
  const point = event.point // Vector3 du point cliqué
  const normal = event.face?.normal // Pour orienter le pin
  
  addPin({
    position: [point.x, point.y, point.z],
    label: '',
  })
}
```

### 3. Schema Drizzle

```ts
// src/lib/db/schema.ts
import { pgTable, uuid, text, timestamp, real, jsonb } from 'drizzle-orm/pg-core'

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const painPoints = pgTable('pain_points', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').references(() => sessions.id).notNull(),
  
  // Position 3D sur le modèle
  posX: real('pos_x').notNull(),
  posY: real('pos_y').notNull(),
  posZ: real('pos_z').notNull(),
  
  // Contenu
  label: text('label').notNull().default(''),
  notes: text('notes'),
  
  // Future: metadata conversation vocale
  metadata: jsonb('metadata'),
  
  createdAt: timestamp('created_at').defaultNow(),
})
```

### 4. State Management: Zustand (léger, parfait pour hackathon)

```ts
// src/lib/stores/pain-session.ts
interface PainPin {
  id: string
  position: [number, number, number]
  label: string
  notes?: string
  isSaved: boolean
}

interface SessionStore {
  sessionId: string | null
  pins: PainPin[]
  selectedPinId: string | null
  
  addPin: (position: [number, number, number]) => void
  updatePin: (id: string, data: Partial<PainPin>) => void
  selectPin: (id: string | null) => void
  removePin: (id: string) => void
}
```

---

## Composants 3D - Approche

### BodyViewer (Container)

```tsx
// Pseudo-structure
export function BodyViewer({ sessionId }: { sessionId: string }) {
  const { pins, addPin, selectedPinId } = useSessionStore()
  
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        
        <HumanModel onSurfaceClick={addPin} />
        
        {pins.map(pin => (
          <PainPin key={pin.id} pin={pin} isSelected={pin.id === selectedPinId} />
        ))}
        
        <OrbitControls enablePan={false} />
      </Canvas>
      
      {/* UI Overlay pour le label sélectionné */}
      <PinEditor />
    </div>
  )
}
```

### PainPin (3D + HTML Label)

```tsx
// Utilise Html de @react-three/drei pour le label
import { Html } from '@react-three/drei'

export function PainPin({ pin, isSelected }: PainPinProps) {
  return (
    <group position={pin.position}>
      {/* Marker visuel 3D */}
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={isSelected ? '#ef4444' : '#f97316'} />
      </mesh>
      
      {/* Label HTML overlay */}
      <Html distanceFactor={10} position={[0, 0.05, 0]}>
        <div className="bg-white px-2 py-1 rounded shadow text-sm whitespace-nowrap">
          {pin.label || 'Cliquer pour éditer'}
        </div>
      </Html>
    </group>
  )
}
```

---

## Phases d'Exécution

### Phase 1: Setup & Base (30min)
- [ ] Installer deps: `three`, `@react-three/fiber`, `@react-three/drei`, `zustand`
- [ ] Setup Drizzle + schema de base
- [ ] Route structure `/session/[id]`

### Phase 2: Rendu 3D (1h)
- [ ] `BodyViewer` avec Canvas basique
- [ ] Placeholder mesh (capsule) cliquable
- [ ] Affichage pins en 3D (spheres)

### Phase 3: Interaction (1h)
- [ ] Zustand store pour pins
- [ ] Clic → ajoute pin
- [ ] Sélection pin → modal/panel pour éditer label
- [ ] Suppression pin

### Phase 4: Persistance (30min)
- [ ] Server action pour save session
- [ ] Load session depuis DB
- [ ] Auto-save ou save explicite

### Phase 5: Polish (restant)
- [ ] Modèle humain réel (.glb)
- [ ] UI/UX clean
- [ ] Responsive

---

## Références Utiles

- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **Drei (helpers):** https://github.com/pmndrs/drei
- **Modèles gratuits:** Sketchfab (chercher "human body base mesh")
- **Drizzle:** https://orm.drizzle.team/docs/overview

---

## Notes pour Feature 2 (Post-MVP)

La conversation vocale par label nécessitera:
- WebRTC ou API speech (Whisper, Deepgram)
- Stockage audio ou transcription dans `metadata` jsonb
- UI pour lancer/stopper enregistrement par pin

**On garde ça hors scope MVP.**
