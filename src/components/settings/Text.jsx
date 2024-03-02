import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "../../constants/constant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const selectConfigs = [
  {
    property: "fontFamily",
    placeholder: "Choose a font",
    options: fontFamilyOptions,
  },
  { property: "fontSize", placeholder: "30", options: fontSizeOptions },
  {
    property: "fontWeight",
    placeholder: "Semibold",
    options: fontWeightOptions,
  },
];


const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}) => (
  <div className='flex flex-col gap-1 border-b border-primary-grey-200 px-5 py-1'>
    <h3 className='text-[10px] uppercase font-semibold text-center'>Text Settings</h3>
    <h3 className='text-[10px] font-semibold'>Play font-size section if you did not see properly</h3>

    <div className='flex flex-col gap-2'>
      {RenderSelect({
        config: selectConfigs[0],
        fontSize,
        fontWeight,
        fontFamily,
        handleInputChange,
      })}

      <div className='flex gap-2'>
        {selectConfigs.slice(1).map((config) =>
          RenderSelect({
            config,
            fontSize,
            fontWeight,
            fontFamily,
            handleInputChange,
          })
        )}
      </div>
    </div>
  </div>
);


const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}) => (
  <Select
    key={config.property}
    onValueChange={(value) => handleInputChange(config.property, value)}
    value={
      config.property === "fontFamily"
        ? fontFamily
        : config.property === "fontSize"
          ? fontSize
          : fontWeight
    }
  >
    <SelectTrigger className='no-ring w-full rounded-sm border border-primary-grey-200 bg-gray-300'>
      <SelectValue
        placeholder={
          config.property === "fontFamily"
            ? "Choose a font"
            : config.property === "fontSize"
              ? "30"
              : "Semibold"
        }
      />
    </SelectTrigger>
    <SelectContent className='border-primary-grey-200 bg-primary-black text-primary-grey-300 bg-gray-300'>
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className=' hover:bg-primary-green hover:text-primary-black'
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default Text;
