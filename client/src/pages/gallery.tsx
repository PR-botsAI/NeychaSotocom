import GalleryGrid from "@/components/gallery-grid";

export default function Gallery() {
  return (
    <div className="container py-24">
      <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Our Gallery
      </h1>
      <p className="mt-6 text-center text-lg text-gray-600">
        Browse our collection of nail art and designs
      </p>
      <div className="mt-16">
        <GalleryGrid />
      </div>
    </div>
  );
}
