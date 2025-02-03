"use client";

import { createFeaturedAction, fetchSupplierData } from "@/app/actions/featured";
import CoreNotFound from "@/components/core/CoreNotFound";
import CoreUploadImages from "@/components/core/CoreUploadImages";
import { ProductType } from "@/types";
import { formDataToObject, tr } from "@/utils";
import {
  Autocomplete,
  AutocompleteItem,
  DateRangePicker,
  Form,
  Select,
  SelectItem,
} from "@heroui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, Key, useEffect, useState } from "react";
import CoreSubmitButton from "@/components/core/CoreSubmitButton";

interface FeaturedCreateBoardFilterProps {
  supplierId: string;
}

const FeaturedCreateBoardFilter: FunctionComponent<
  FeaturedCreateBoardFilterProps
> = ({ supplierId }) => {
  const [select, setSelect] = useState("product");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]); 
  const [items, setItems] = useState<any[]>(products);
  const [item, setItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchSupplierData(supplierId);
      setProducts(data.products);
      setBrands(data.brands);
      setLoading(false);
    };
    fetchData();
  }, [supplierId]);

  const onClear = () => {
    // Implement the clear functionality if needed
  };

  const onChange = (e: string) => {
    if (e === "product") {
      setItems(products);
    } else {
      setItems(brands);
    }
    setSelect(e);
  };

  const onSelectionChange = (key: Key | null) => {
    if (key) setItem(key as string);
  };

  const submit = async (formData: FormData) => {
    const { startDate, endDate } = formDataToObject(formData);
    const body = {
      supplierId,
      type: select,
      image: images.length > 0 ? images[0] : "", 
      itemId: item,
      startAt: new Date(startDate as string).toISOString(),
      endAt: new Date(endDate as string).toISOString(),
      isActive: true,
      priority: 2,
    };
    console.log(body);
    await createFeaturedAction(body).then((d) => console.log(d));
  };

  return (
    <Form className="flex flex-col gap-4" action={submit}>
      <Select
        aria-label="core"
        aria-hidden="false"
        name="isActive"
        defaultSelectedKeys={"all"}
        placeholder="--"
        value={select}
        label={tr("Сонгох")}
        labelPlacement="outside"
        items={[
          {
            key: "product",
            value: "Бүтээгдэхүүн",
          },
          {
            key: "brand",
            value: "Бранд",
          },
        ]}
        variant="bordered"
        classNames={{
          label: "text-xs font-medium",
        }}
        onChange={(e) => onChange(e.target.value)}
      >
        {(option) => <SelectItem key={option.key}>{option.value}</SelectItem>}
      </Select>

      <Autocomplete
        className="max-w-xs"
        defaultSelectedKey={supplierId}
        defaultItems={items}
        isLoading={loading}
        color="primary"
        label={tr("-- Сонгох --")}
        variant="flat"
        radius="none"
        value={item == null ? undefined : item}
        onSelectionChange={onSelectionChange}
        clearButtonProps={{
          onPress: onClear,
        }}
        listboxProps={{
          emptyContent: (
            <CoreNotFound
              text={`${
                select === "product" ? "Бүтээгдэхүүн" : "Бранд"
              } олдсонгүй`}
            />
          ),
        }}
        scrollShadowProps={{
          isEnabled: false,
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id} className="pl-4">
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <DateRangePicker
        label="Эхлэх, дуусах огноо"
        variant="bordered"
        startName="startDate"
        endName="endDate"
        errorMessage={tr("Өдөр сонгоно уу")}
        calendarProps={{ disableAnimation: true }}
      />

      {/* Image Upload Section */}
      <CoreUploadImages
        images={images}
        setImages={setImages}
        className="my-custom-class"
        maxImages={1} // Adjust the maximum number of images as needed
      />

      <CoreSubmitButton
        text="Хайх"
        startContent={<FunnelIcon className="w-4 h-4" />}
        className="w-full"
      />
    </Form>
  );
};

export default FeaturedCreateBoardFilter;
