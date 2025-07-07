import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const initialProducts = [
  { id: 1, name: "Printed Resort Shirt", price: 29.99, sku: "PRNT-RES-004", images: [] },
  { id: 2, name: "Chino Pants", price: 55, sku: "BW-005", images: [] },
  { id: 3, name: "Cargo Pants", price: 50, sku: "BW-008", images: [] },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
    );
    toast.success("Product updated successfully!");
    setIsEditOpen(false);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    toast.success(`${selectedProduct.name} deleted.`);
    setIsDeleteOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedProduct((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...imageUrls],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#ea2e0e] mb-6">
        Product Management - Veda Gifts & Arts
      </h2>

      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">SKU</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4 space-x-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Edit Dialog --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-xl p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#ea2e0e]">
              Edit Product Details
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-5 mt-4">
              <div>
                <Label className="text-sm text-gray-700">Product Name</Label>
                <Input
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-700">Price</Label>
                <Input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, price: +e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter product price"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-700">SKU</Label>
                <Input
                  value={selectedProduct.sku}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, sku: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter SKU code"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-700">Upload Images</Label>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedProduct.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="product"
                    className="w-20 h-20 object-cover border rounded-md shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#ea2e0e] hover:bg-[#c62807] text-white"
              onClick={handleEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog --- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Confirm Product Deletion
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-700 mt-3">
            Are you sure you want to permanently remove{" "}
            <span className="font-bold text-[#ea2e0e]">
              {selectedProduct?.name}
            </span>
            ? This action cannot be undone.
          </p>

          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDelete}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
