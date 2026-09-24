import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import CarForm from "../../components/CarForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { getCarById, updateCar, uploadCarImage, uploadCarImages, deleteCarImageByUrl } from "../../services/carService";
import { useToast } from "../../hooks/useToast";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Edit Car | CarGo Admin";
    getCarById(id)
      .then(setCar)
      .catch(() => setCar(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async ({ data, primaryImage, galleryImages, originalPrimaryUrl, originalGalleryUrls }) => {
    setSubmitting(true);
    try {
      let image_url = primaryImage.url;
      if (primaryImage.file) {
        const uploaded = await uploadCarImage(primaryImage.file, "cars");
        image_url = uploaded.url;
        if (originalPrimaryUrl && originalPrimaryUrl !== image_url) {
          await deleteCarImageByUrl(originalPrimaryUrl).catch(() => {});
        }
      }

      const newGalleryFiles = galleryImages.filter((g) => g.file);
      const existingGalleryUrls = galleryImages.filter((g) => !g.file).map((g) => g.url);
      const uploaded = newGalleryFiles.length
        ? await uploadCarImages(newGalleryFiles.map((g) => g.file), "cars/gallery")
        : [];
      const gallery_images = [...existingGalleryUrls, ...uploaded.map((u) => u.url)];

      const removedGalleryUrls = (originalGalleryUrls || []).filter((url) => !gallery_images.includes(url));
      await Promise.all(removedGalleryUrls.map((url) => deleteCarImageByUrl(url).catch(() => {})));

      await updateCar(id, { ...data, image_url, gallery_images });
      toast.success("Car updated successfully.");
      navigate("/admin/cars");
    } catch (err) {
      toast.error(err.message || "Failed to update car.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!car) {
    return (
      <EmptyState
        title="Car not found"
        description="This car may have already been deleted."
        action={
          <Link to="/admin/cars" className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950">
            Back to Cars
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <Link to="/admin/cars" className="inline-flex items-center gap-1 text-sm font-semibold text-navy-500 hover:text-navy-800 dark:text-white/50 dark:hover:text-white">
        <ChevronLeft className="h-4 w-4" />
        Back to Cars
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-navy-950 dark:text-white">Edit Car</h1>
      <p className="mt-1 text-sm text-navy-500 dark:text-white/50">Update the details for {car.name}.</p>

      <div className="mt-6 max-w-3xl">
        <CarForm initialData={car} submitLabel="Save Changes" submitting={submitting} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
