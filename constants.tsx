
import { Car } from './types';

export const CAR_MODELS: Car[] = [
  {
    id: 'k1-apex',
    name: 'Kiruthika Apex',
    model: 'Apex S-1',
    year: 2024,
    price: 345000,
    category: 'Hypercar',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    description: 'The pinnacle of aerodynamic engineering. The Apex S-1 redefines speed with its proprietary carbon-fiber monocoque and a heart-pounding 1200hp hybrid engine.',
    specs: {
      acceleration: '0-60 in 1.9s',
      topSpeed: '248 mph',
      power: '1200 HP',
      driveType: 'AWD'
    },
    featured: true
  },
  {
    id: 'k1-nebula',
    name: 'Kiruthika Nebula',
    model: 'Nebula EV',
    year: 2025,
    price: 89000,
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200',
    description: 'Silent luxury meets sustainable performance. The Nebula EV features our revolutionary solid-state battery technology, offering unprecedented range and rapid charging.',
    specs: {
      acceleration: '0-60 in 3.2s',
      topSpeed: '155 mph',
      range: '520 miles',
      power: '670 HP',
      driveType: 'AWD'
    }
  },
  {
    id: 'k1-sentinel',
    name: 'Kiruthika Sentinel',
    model: 'Sentinel GX',
    year: 2024,
    price: 125000,
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
    description: 'Command every terrain. The Sentinel GX combines uncompromising off-road capability with a bespoke interior crafted from the finest sustainably sourced materials.',
    specs: {
      acceleration: '0-60 in 4.8s',
      topSpeed: '140 mph',
      power: '550 HP',
      driveType: '4WD'
    },
    featured: true
  },
  {
    id: 'k1-monarch',
    name: 'Kiruthika Monarch',
    model: 'Monarch L',
    year: 2025,
    price: 195000,
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    description: 'The ultimate executive experience. Every detail of the Monarch L is engineered for comfort, from its adaptive air suspension to the state-of-the-art AI cabin assistant.',
    specs: {
      acceleration: '0-60 in 4.1s',
      topSpeed: '165 mph',
      power: '500 HP',
      driveType: 'RWD'
    }
  },
  {
    id: 'k1-vintage-v8',
    name: 'Kiruthika Heritage',
    model: 'Heritage V8',
    year: 1972,
    price: 280000,
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    description: 'A masterpiece from our archives. Fully restored by our Master Craftsmen, the Heritage V8 retains its raw mechanical soul with modern reliability enhancements.',
    specs: {
      acceleration: '0-60 in 5.5s',
      topSpeed: '135 mph',
      power: '420 HP',
      driveType: 'RWD'
    }
  },
  {
    id: 'k1-pulse',
    name: 'Kiruthika Pulse',
    model: 'Pulse R',
    year: 2024,
    price: 65000,
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Dynamic urban mobility. The Pulse R is designed for the modern city-dweller, offering agile handling, smart connectivity, and a sleek, compact footprint.',
    specs: {
      acceleration: '0-60 in 5.8s',
      topSpeed: '120 mph',
      range: '310 miles',
      power: '280 HP',
      driveType: 'FWD'
    }
  }
];
