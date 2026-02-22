/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

const ORB_COUNT = 8;
const LINE_COUNT = 50;

const Orb = ({ initialSpeed, orbitRadius, offset, color }) => {
    const mesh = useRef();
    const [speed, setSpeed] = useState(initialSpeed);
    const [bursting, setBursting] = useState(false);

    // Random burst cycle
    const burstDelay = useMemo(() => Math.random() * 5 + 2, []); // Random delay start
    const burstDuration = 0.5; // Short burst

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const cycle = (t + offset) % (Math.PI * 2); // 0 to 2PI

        // Burst logic: simple periodic check or math based?
        // Let's use noise-like or periodic burst
        // "One acceleration burst per orbit" implies at a specific angle.
        // Let's burst when angle is around 0 (closest to camera?) or random.
        // Let's burst at angle PI/2 for effect.

        // Current angle in full cycle
        const angle = (t * speed) + offset;
        const normalizedAngle = angle % (Math.PI * 2);

        // Define burst zone (e.g., between 3.0 and 3.5 radians)
        const inBurstZone = normalizedAngle > 3.0 && normalizedAngle < 3.8;

        // Smoothly adjust speed
        const targetSpeed = inBurstZone ? initialSpeed * 2.5 : initialSpeed;

        // Simple lerp for speed transition
        // Since we are adding to rotation/position, we need to integrate speed.
        // Instead of complex integration, we'll just move the object along a path calculated each frame based on accrued time?
        // No, simplest is update position manually.

        // Manual position update
        if (mesh.current) {
            // Acceleration logic
            if (inBurstZone && !bursting) {
                setBursting(true);
            } else if (!inBurstZone && bursting) {
                setBursting(false);
            }

            // Dynamic Radius (wobble)
            const r = orbitRadius + Math.sin(t * 0.5) * 0.5;
            const y = Math.sin(t * 0.3 + offset) * 2;

            // Speed factor
            // Actually, `angle` above assumed constant speed. 
            // Better: state.clock.delta * currentSpeed
            mesh.current.userData.angle = (mesh.current.userData.angle || offset) + (state.clock.getDelta() * (bursting ? 2.5 : 1));

            const curAngle = mesh.current.userData.angle;

            mesh.current.position.x = Math.cos(curAngle) * r;
            mesh.current.position.z = Math.sin(curAngle) * r;
            mesh.current.position.y = y;
        }
    });

    return (
        <group>
            {/* Trail */}
            <Trail
                width={bursting ? 1.5 : 0.6} // Width of the trail
                length={bursting ? 12 : 6} // Length of the trail
                color={color} // Color
                attenuation={(t) => t * t} // Taper logic
            >
                <mesh ref={mesh}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                    {/* Glow Halo */}
                    <mesh scale={[1.5, 1.5, 1.5]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} />
                    </mesh>
                </mesh>
            </Trail>
        </group>
    );
};

// Layer 3: Subtle Scratch Lines (Drifting Lines)
const AmbientLines = () => {
    const lines = useMemo(() => {
        return Array.from({ length: LINE_COUNT }).map(() => {
            const pos = [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ];
            const length = Math.random() * 0.5 + 0.2;
            // Random orientation primarily diagonal/horizontal
            const angle = Math.random() * Math.PI;
            return { pos, length, angle, speed: Math.random() * 0.02 + 0.005 };
        });
    }, []);

    const group = useRef();

    useFrame((state, delta) => {
        if (group.current) {
            // Slowly drift the whole group or individual lines?
            // Group drift is cheaper
            group.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <group ref={group}>
            {lines.map((l, i) => (
                <Line
                    key={i}
                    points={[
                        [l.pos[0], l.pos[1], l.pos[2]],
                        [l.pos[0] + Math.cos(l.angle) * l.length, l.pos[1] + Math.sin(l.angle) * l.length, l.pos[2]]
                    ]}
                    color="#ffffff"
                    transparent
                    opacity={0.08}
                    lineWidth={1}
                />
            ))}
        </group>
    );
};

const OrbitingOrbsScene = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />

                {/* Orbs */}
                <Orb initialSpeed={0.8} orbitRadius={4} offset={0} color="#00ff9d" />
                <Orb initialSpeed={0.9} orbitRadius={5} offset={2} color="#3b82f6" />
                <Orb initialSpeed={0.7} orbitRadius={3} offset={4} color="#8b5cf6" />

                {/* Background Lines */}
                <AmbientLines />

                {/* Fog for cinematic depth */}
                <fog attach="fog" args={['#0f172a', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default OrbitingOrbsScene;
