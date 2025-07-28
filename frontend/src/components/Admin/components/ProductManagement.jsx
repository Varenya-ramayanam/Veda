// ProductManagement.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import {
  fetchAdminProducts,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.adminProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    sku: "",
    description: "",
    category: "",
    stock: "",
    collections: "",
    material: "",
    color: "",
    images: [],
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleFileChange = (e, isNew = false) => {
    const files = Array.from(e.target.files);
    if (isNew) {
      setNewProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    } else {
      setSelectedProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...files],
      }));
    }
  };

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => formData.append("images", img));
        } else {
          formData.append(key, value);
        }
      });

      await dispatch(addProduct(formData)).unwrap();
      toast.success("Product added successfully!");
      setIsAddOpen(false);
      setNewProduct({
        name: "",
        price: "",
        sku: "",
        description: "",
        category: "",
        stock: "",
        collections: "",
        material: "",
        color: "",
        images: [],
      });
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      const newFiles = selectedProduct.images?.filter((img) => img instanceof File);
      const existingImages = selectedProduct.images?.filter((img) => !(img instanceof File));

      Object.entries(selectedProduct).forEach(([key, value]) => {
        if (key === "images") {
          newFiles.forEach((img) => formData.append("images", img));
          if (existingImages.length) {
            formData.append("existingImages", JSON.stringify(existingImages));
          }
        } else {
          formData.append(key, value);
        }
      });

      await dispatch(updateProduct({ id: selectedProduct._id, productData: formData })).unwrap();
      toast.success("Product updated successfully!");
      setIsEditOpen(false);
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProduct._id)).unwrap();
      toast.success(`${selectedProduct.name} deleted.`);
      setIsDeleteOpen(false);
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const fields = [
    "name",
    "price",
    "sku",
    "description",
    "category",
    "collections",
    "material",
    "color",
    "stock",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#ea2e0e]">Product Management - Veda Gifts & Arts</h2>
        <Button className="bg-[#ea2e0e] text-white" onClick={() => setIsAddOpen(true)}>
          + Add Product
        </Button>
      </div>

      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">SKU</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">Loading products...</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    {product.image?.[0]?.url ? (
                      <img
                        src={product.image[0].url}
                        alt={product.image[0].altText || "Product image"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      className="bg-yellow-500 text-white"
                      onClick={() => {
                        setSelectedProduct({ ...product, images: product.image || [] });
                        setIsEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-600 text-white"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-xl p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#ea2e0e]">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 mt-4">
            {fields.map((field) => (
              <div key={field}>
                <Label>{field[0].toUpperCase() + field.slice(1)}</Label>
                <Input
                  type={["price", "stock"].includes(field) ? "number" : "text"}
                  value={newProduct[field]}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, [field]: ["price", "stock"].includes(field) ? +e.target.value : e.target.value })
                  }
                />
              </div>
            ))}
            <div>
              <Label>Upload Images</Label>
              <Input type="file" multiple onChange={(e) => handleFileChange(e, true)} />
            </div>
            <div className="flex flex-wrap gap-3">
              {newProduct.images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-20 h-20 object-cover border rounded"
                />
              ))}
            </div>
          </div>
          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button className="bg-[#ea2e0e] text-white" onClick={handleAdd}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-xl p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-yellow-600">Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-5 mt-4">
              {fields.map((field) => (
                <div key={field}>
                  <Label>{field[0].toUpperCase() + field.slice(1)}</Label>
                  <Input
                    type={["price", "stock"].includes(field) ? "number" : "text"}
                    value={selectedProduct[field]}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        [field]: ["price", "stock"].includes(field) ? +e.target.value : e.target.value,
                      })
                    }
                  />
                </div>
              ))}
              <div>
                <Label>Upload New Images</Label>
                <Input type="file" multiple onChange={(e) => handleFileChange(e)} />
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.images?.map((img, idx) => {
                  const previewUrl = img instanceof File ? URL.createObjectURL(img) : img.url;
                  return (
                    <img
                      key={idx}
                      src={previewUrl}
                      alt="preview"
                      className="w-20 h-20 object-cover border rounded"
                    />
                  );
                })}
              </div>
            </div>
          )}
          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button className="bg-yellow-600 text-white" onClick={handleEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?</p>
          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 text-white" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
