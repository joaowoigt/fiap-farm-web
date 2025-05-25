export enum Type {
  crops = "crops",
  livestock = "livestock",
  dairy = "dairy",
}

export const getTypeFromDb = (type: string): Type => {
  switch (type) {
    case "crops":
      return Type.crops;
    case "livestock":
      return Type.livestock;
    case "dairy":
      return Type.dairy;
    default:
      throw new Error("Invalid type");
  }
};
