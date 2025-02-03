"use client";

import { createFeaturedAction, fetchSupplierData,} from "@/app/actions/featured";
import CoreNotFound from "@/components/core/CoreNotFound";
import { ProductType } from "@/types";
import { formDataToObject, tr } from "@/utils";
import { Autocomplete, AutocompleteItem, DateRangePicker, Form, Select, SelectItem } from "@heroui/react";
import { FunctionComponent, Key, useEffect, useState,} from "react";
import CoreSubmitButton from "@/components/core/CoreSubmitButton";
import { FunnelIcon } from "@heroicons/react/24/outline";



interface FeaturedCreateBoardFilterProps {
  supplierId: string;
  //   create: (type: string, itemId: string, start: Date, end: Date) => void;
}


const FeaturedCreateBoardFilter: FunctionComponent<FeaturedCreateBoardFilterProps> = (props) => {
  
  const { supplierId } = props;
  const [select, setSelect] = useState("product");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
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
    // removeSupplierAction(pathname);
  };

  const [items, setItems] = useState<any[]>(products);
  const [item, setItem] = useState<string | null>(null);
  const onChange = (e: string) => {
    e == "product" ? setItems(products) : setItems(brands);
    setSelect(e);
  };

  const onSelectionChange = (key: Key | null) => {
    key && setItem(key as string);
  };

  const submit = async (formData: FormData) => {
    const { startDate, endDate } = formDataToObject(formData);
    const body = {
      supplierId: supplierId,
      type: select,
      image:
        "https://pics.ebazaar.link/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg",
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
              text={`${select == "product" ? "Бүтээгдэхүүн" : "Бранд" } олдсонгүй`}
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
      <CoreSubmitButton
        text="Хайх"
        startContent={<FunnelIcon className="w-4 h-4" />}
        className="w-full"
      />
    </Form>
  );
};
export default FeaturedCreateBoardFilter;