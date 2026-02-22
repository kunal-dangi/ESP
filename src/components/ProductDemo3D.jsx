/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, Float, Line, PerspectiveCamera, OrbitControls, Trail, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import './ProductDemo.css';

// --- Configuration ---
const COLORS = {
    demand: '#3b82f6', // Blue
    match: '#8b5cf6', // Violet
    startup: '#10b981', // Green
    line: '#334155', // Slate-700
    particle: '#ffffff'
};

const Node = ({ position, color, label, icon, onHover, description }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.rotation.x = time * 0.2;
            mesh.current.rotation.y = time * 0.2;
            // Pulse scale slightly on hover
            const scale = hovered ? 1.2 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Core Node */}
                <mesh
                    ref={mesh}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); if (onHover) onHover(label, description); }}
                    onPointerOut={(e) => { setHovered(false); if (onHover) onHover(null, null); }}
                >
                    <icosahedronGeometry args={[0.8, 1]} /> {/* Low poly look */}
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={false}
                    />
                </mesh>

                {/* Outer Wireframe for Tech Feel */}
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <icosahedronGeometry args={[0.8, 1]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
                </mesh>

                {/* Label */}
                <Text
                    position={[0, -1.4, 0]}
                    fontSize={0.3}
                    color="#e2e8f0"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>

                {/* Tooltip via Html */}
                {hovered && (
                    <Html distanceFactor={10} zIndexRange={[100, 0]}>
                        <div className="node-tooltip">
                            <h4 style={{ color: color }}>{label}</h4>
                            <p>{description}</p>
                        </div>
                    </Html>
                )}
            </Float>
        </group>
    );
};

// Simple particle moving along a defined path
const DataParticle = ({ start, end, color, speed, offset }) => {
    const mesh = useRef();
    // Using a simple lerp along the line
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const t = (time * speed + offset) % 1; // Loop 0 to 1

        if (mesh.current) {
            mesh.current.position.lerpVectors(
                new THREE.Vector3(...start),
                new THREE.Vector3(...end),
                t
            );

            // Fade in/out at ends could be done with material opacity, but let's keep it simple
            // Scale or opacity could be driven by t
            const scale = Math.sin(t * Math.PI) * 1.5; // Grow in middle
            mesh.current.scale.setScalar(scale > 0 ? scale : 0);
        }
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
    );
};

const Connection = ({ start, end }) => {
    // Generate particles
    const particles = useMemo(() => {
        return Array.from({ length: 3 }).map((_, i) => ({
            offset: i / 3, // evenly spaced
            speed: 0.5
        }));
    }, []);

    // Convert arrays to Vector3 for Line component
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

    return (
        <group>
            {/* Static Line */}
            <Line
                points={points}
                color={COLORS.line}
                lineWidth={1}
                transparent
                opacity={0.3}
            />
            {/* Flowing Data Particles */}
            {particles.map((p, i) => (
                <DataParticle key={i} start={start} end={end} color={COLORS.particle} speed={p.speed} offset={p.offset} />
            ))}
        </group>
    );
};


const SceneContent = ({ isMobile }) => {
    // Define positions
    // Desktop: Left -> Center -> Right
    // Mobile: Top -> Center -> Bottom (Vertical stack)
    const positions = isMobile ? {
        demand: [0, 2.5, 0],
        match: [0, 0, 0],
        startup: [0, -2.5, 0]
    } : {
        demand: [-4, 0, 0],
        match: [0, 0, 0],
        startup: [4, 0, 0]
    };

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color={COLORS.demand} />

            <group position={[0, 0, 0]}>
                {/* Node 1: Demand Signals */}
                <Node
                    position={positions.demand}
                    color={COLORS.demand}
                    label="Demand Signals"
                    description="Real-time intent data captured from social platforms."
                />

                {/* Node 2: Matching Engine */}
                <Node
                    position={positions.match}
                    color={COLORS.match}
                    label="AI Matching"
                    description="Our engine filters and pairs high-intent leads with startups."
                />

                {/* Node 3: Startup */}
                <Node
                    position={positions.startup}
                    color={COLORS.startup}
                    label="Your Startup"
                    description="Qualified leads delivered directly to your dashboard."
                />

                {/* Connections */}
                <Connection start={positions.demand} end={positions.match} />
                <Connection start={positions.match} end={positions.startup} />
            </group>

            {/* Controls */}
            {!isMobile && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 + 0.2}
                    minPolarAngle={Math.PI / 2 - 0.2}
                    maxAzimuthAngle={0.2}
                    minAzimuthAngle={-0.2}
                    rotateSpeed={0.5}
                />
            )}
        </>
    );
};

const ProductDemo3D = () => {
    // Check initial window size safely for SSR/SSG contexts
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="product-demo-container">
            {/* Overlay Title for Context */}
            <div className="demo-label">
                <span className="demo-label-text">Live Pipeline Demo</span>
            </div>

            <div className="product-demo-canvas-wrapper">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
                    <SceneContent isMobile={isMobile} />
                </Canvas>
            </div>
        </div>
    );
};

export default ProductDemo3D;
