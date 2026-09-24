import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import CarForm from "../../components/CarForm";
import { createCar, uploadCarImage, uploadCarImages } from "../../services/carService";
import { useToast } from "../../hooks/useToast";

export default function AddCar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Add New Car | CarGo Admin";
  }, []);

  const handleSubmit = async ({ data, primaryImage, galleryImages }) => {
    setSubmitting(true);
    try {
      const { url: image_url } = await uploadCarImage(primaryImage.file, "cars");

      const newGalleryFiles = galleryImages.map((g) => g.file).filter(Boolean);
      const uploaded = newGalleryFiles.length ? await uploadCarImages(newGalleryFiles, "cars/gallery") : [];
      const gallery_images = uploaded.map((u) => u.url);

      await createCar({ ...data, image_url, gallery_images });
      toast.success("Car added successfully.");
      navigate("/admin/cars");
    } catch (err) {
      toast.error(err.message || "Failed to add car.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Link to="/admin/cars" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-500 hover:text-navy-800 dark:text-white/50 dark:hover:text-white">
        <ChevronLeft className="h-4 w-4" />
        Back to Cars
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-navy-950 dark:text-white">Add New Car</h1>
      <p className="mt-1 text-sm text-navy-500 dark:text-white/50">Fill in the details below to add a car to your fleet.</p>

      <div className="mt-6 max-w-3xl">
        <CarForm submitLabel="Add Car" submitting={submitting} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
