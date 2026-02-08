import { JellySlider } from '@/components/JellySlider';

export default function Home() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <JellySlider className="w-full h-full" />
    </div>
  );
}
