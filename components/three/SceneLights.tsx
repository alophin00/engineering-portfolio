"use client";

export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} />
      <directionalLight position={[-4, -1, -3]} intensity={0.45} color="#6599c8" />
      <gridHelper args={[8, 16, "#1d3b5c", "#11263c"]} position={[0, -1.35, 0]} />
    </>
  );
}
