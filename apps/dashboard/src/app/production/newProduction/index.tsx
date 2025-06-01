import { Button } from "@repo/ui/buttons";
import {
  Dropdown,
  DropDownItem,
  menuStatusDropDownItems,
  menuTypeDropDownItems,
  ProductionType,
  StatusType,
} from "@repo/ui/dropdown";
import { Text } from "@repo/ui/texts";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Production from "../../../domain/models/farm/production/Production";
import { getTypeFromUi } from "../../../domain/models/farm/product/Type";
import { getStatusFromUi } from "../../../domain/models/farm/production/Status";

interface NewProductionProps {
  onAddProduction: (production: Production) => Promise<boolean>;
}

export default function NewProduction({ onAddProduction }: NewProductionProps) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState<StatusType>(StatusType.inProgress);
  const [unitValue, setUnitValue] = useState(0);
  const [type, setType] = useState(ProductionType.crops);
  const [success, setSuccess] = useState(false);

  const clearFields = () => {
    console.log("Clearing fields");
    setProductName("");
    setQuantity(0);
    setStatus(StatusType.inProgress);
    setUnitValue(0);
    setType(ProductionType.crops);
  };
  const handleAddProduction = async () => {
    const production: Production = {
      product: {
        name: productName,
        type: getTypeFromUi(type),
        unitValue: unitValue,
      },
      quantity: quantity,
      status: getStatusFromUi(status),
    };
    let success = await onAddProduction(production);
    if (!success) {
      console.error("Failed to add production");
      return;
    }
    console.log("Production added:", production);
    clearFields();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000); // Clear success message after 3 seconds
  };
  return (
    <div className="flex flex-col border-2 h-fit border-background rounded-lg mx-3 p-3">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="New Production"
      ></Text>
      <Text
        intent="Small"
        color="default"
        text="Add a new production to the farm."
      ></Text>
      <input
        className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-full  py-3 text-black text-start flex flex-row hover:cursor-text"
        type="text"
        name="productName"
        onChange={(event: any) => setProductName(event.target.value)}
        placeholder="Enter the product name"
        color="default"
        value={productName}
      ></input>
      <input
        className="outline outline-1 outline-primary mb-6 bg-white rounded-md px-3 w-full  py-3 text-black text-start flex flex-row hover:cursor-text"
        type="number"
        name="quantity"
        placeholder="Enter the product quantity"
        onChange={(event: any) => setQuantity(event.target.value)}
        color="default"
        value={quantity !== 0 ? quantity : ""}
      ></input>
      <CurrencyInput
        placeholder="Enter the product unit value"
        decimalsLimit={2}
        onValueChange={(value, name, values) =>
          setUnitValue(values?.float as number)
        }
        value={unitValue !== 0 ? unitValue : ""}
        prefix="R$"
        className="outline outline-1 outline-primary  mb-6 mt-medium bg-white rounded-md px-3  py-3 text-black text-start flex flex-row hover:cursor-text"
      />
      <div className="mb-6">
        <Dropdown
          placeholder="Select the product status"
          onSelect={(item: DropDownItem) => setStatus(item.type as StatusType)}
          menuItems={menuStatusDropDownItems}
        />
      </div>
      <div className="mb-6">
        <Dropdown
          placeholder="Select the product type"
          onSelect={(item: DropDownItem) =>
            setType(item.type as ProductionType)
          }
          menuItems={menuTypeDropDownItems}
        />
      </div>

      <div className="mt-3 flex justify-end">
        <Text
          intent="Small"
          color="default"
          text={success ? "Production added successfully!" : ""}
        ></Text>
        <Button
          intent="secondary"
          onClick={handleAddProduction}
          text="Add Production"
        ></Button>
      </div>
    </div>
  );
}
