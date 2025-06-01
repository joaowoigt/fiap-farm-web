import { Dropdown } from "@repo/ui/dropdown";
import Product from "../../../domain/models/farm/product/Product";
import { useState } from "react";
import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";

interface NewSalesProps {
  products: Product[];
  onAddSale: (product: Product, quantity: number) => Promise<boolean>;
}

export default function NewSales({ products, onAddSale }: NewSalesProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddSale = async () => {
    if (!product || quantity <= 0) {
      console.error("Invalid product or quantity");
      return;
    }
    const success = await onAddSale(product, quantity);
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setProduct(null);
      setQuantity(0);
    } else {
      console.error("Failed to add sale");
    }
  };
  return (
    <div className="flex flex-col border-2 h-fit border-background rounded-lg mx-3 p-3">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="New Sales"
      ></Text>
      <Text
        intent="Small"
        color="default"
        text="Add a new sale to the farm."
      ></Text>
      <div className="mt-4">
        <Dropdown
          placeholder="Select a product"
          menuItems={products.map((product) => ({
            title: product.name,
            type: product.type,
          }))}
          onSelect={(item) => {
            const selectedProduct = products.find((p) => p.name === item.title);
            if (selectedProduct) {
              setProduct(selectedProduct);
            }
          }}
        />
      </div>
      <div className="mt-4">
        <input
          className="outline outline-1 outline-primary mb-6 bg-white rounded-md px-3 w-full  py-3 text-black text-start flex flex-row hover:cursor-text"
          type="number"
          name="quantity"
          placeholder="Enter the quantity sold"
          onChange={(event: any) => setQuantity(event.target.value)}
          color="default"
          value={quantity !== 0 ? quantity : ""}
        ></input>
      </div>
      <div className="mt-3 flex justify-end">
        <Text
          intent="Small"
          color="default"
          text={success ? "Sale added successfully!" : ""}
        ></Text>
        <Button
          intent="secondary"
          onClick={handleAddSale}
          text="Add Sale"
        ></Button>
      </div>
    </div>
  );
}
