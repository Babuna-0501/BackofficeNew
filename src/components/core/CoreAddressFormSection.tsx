import { errorMessageMap } from '@/configs';
import { CityType, MerchantType, SupplierType } from '@/types';
import { tr } from '@/utils';
import { Select, SelectItem, Textarea } from '@heroui/react';
import { FunctionComponent, useState } from 'react';

interface CoreAddressFormSectionProps {
  locations: CityType[];
  item?: SupplierType | MerchantType;
}

const CoreAddressFormSection: FunctionComponent<CoreAddressFormSectionProps> = ({ locations, item }) => {
  const [cityId, setCityId] = useState<string>(item?.city?.id || '');
  const [districtId, setDistrictId] = useState<string>(item?.district?.id || '');

  const cityList = locations.map(city => {
    return { key: city.id, value: city.name, ...city };
  });

  const districtList =
    cityList
      .find(city => city.id === cityId)
      ?.districts.map(district => ({ key: district.id, value: district.name, ...district })) || [];

  const subDistrictList =
    districtList
      .find(district => district.id === districtId)
      ?.subDistricts.map(subDistrict => ({ key: subDistrict.id, value: subDistrict.name, ...subDistrict })) || [];

  return (
    <>
      <div className='grid grid-cols-3 gap-3 w-full'>
        <Select
          name='cityId'
          placeholder='--'
          label={tr('Хот / Аймаг')}
          onChange={e => setCityId(e.target.value)}
          defaultSelectedKeys={[cityId]}
          aria-label='core'
          aria-hidden='false'
          isRequired
          labelPlacement='outside'
          items={cityList}
          variant='bordered'
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        >
          {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
        </Select>
        <Select
          aria-label='core'
          aria-hidden='false'
          defaultSelectedKeys={[districtId]}
          name='districtId'
          isRequired
          placeholder='--'
          label={tr('Дүүрэг / Сум')}
          labelPlacement='outside'
          items={districtList}
          variant='bordered'
          onChange={e => setDistrictId(e.target.value)}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        >
          {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
        </Select>
        <Select
          aria-label='core'
          aria-hidden='false'
          defaultSelectedKeys={[item?.subDistrict?.id || '']}
          name='subDistrictId'
          isRequired
          placeholder='--'
          label={tr('Хороо / Баг')}
          labelPlacement='outside'
          items={subDistrictList}
          variant='bordered'
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        >
          {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
        </Select>
      </div>

      <Textarea
        isRequired
        type='text'
        name='address'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Дэлгэрэнгүй хаяг')}
        defaultValue={item?.address}
        placeholder={tr('Дэлгэрэнгүй хаяг')}
        classNames={{
          label: 'text-xs font-medium',
          helperWrapper: 'absolute -bottom-5 left-0'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />
    </>
  );
};

export default CoreAddressFormSection;
