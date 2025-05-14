import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Model({ url, scale = 3, animate = true }: { url: string; scale?: number; animate?: boolean }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);

    // Auto-rotation seulement si animate est true
    useFrame(() => {
        if (modelRef.current && animate) {
            modelRef.current.rotation.y += 0.001; // Vitesse de rotation
        }
    });

    // Ajustement de l'échelle pour adapter le zoom
    return <primitive ref={modelRef} object={scene} scale={scale} position={[0, 0, 0]} />;
}

export default function ModelViewer({ url, scale = 3, animate = true }: { url: string; scale?: number; animate?: boolean }) {
    // Détection si le modèle est animé basé sur l'URL (si contient "animer" dans le nom)
    const [shouldAnimate, setShouldAnimate] = useState(animate);

    useEffect(() => {
        // Vérifier si l'URL contient "animer" pour déterminer si l'animation doit être activée
        if (url.toLowerCase().includes('animer')) {
            setShouldAnimate(true);
        }
    }, [url]);

    return (
        <div className="h-full w-full overflow-hidden rounded-lg">
            <Canvas camera={{ position: [0, 5, 5] }}>
                <ambientLight intensity={2} />
                <directionalLight position={[0, 0, 5]} />
                <OrbitControls enableZoom={true} />
                <Suspense fallback={null}>
                    <Model url={url} scale={scale} animate={shouldAnimate} />
                </Suspense>
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
