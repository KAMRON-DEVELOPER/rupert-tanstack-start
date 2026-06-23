import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/ui/combobox'
import type { ComboboxOption } from './SingleCombobox'

type MultiComboboxProps<Value extends string> = {
  id: string
  options: ComboboxOption<Value>[]
  values: Value[] | null | undefined
  placeholder: string
  emptyLabel?: string
  onChange: (values: Value[]) => void
}

function MultiCombobox<Value extends string>({
  id,
  options,
  values,
  placeholder,
  emptyLabel = 'No results found',
  onChange
}: MultiComboboxProps<Value>) {
  const anchorRef = useComboboxAnchor()
  const selectedOptions = options.filter((option) => values?.includes(option.value))

  return (
    <Combobox
      items={options}
      multiple
      value={selectedOptions}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.label}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      onValueChange={(nextOptions) => onChange(nextOptions.map((option) => option.value))}
    >
      <ComboboxChips ref={anchorRef}>
        <ComboboxValue>
          {selectedOptions.map((option) => (
            <ComboboxChip key={option.value}>{option.label}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput id={id} placeholder={selectedOptions.length ? '' : placeholder} />
      </ComboboxChips>
      <ComboboxContent anchor={anchorRef}>
        <ComboboxInput placeholder="Search..." />
        <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
        <ComboboxList>
          {(option: ComboboxOption<Value>) => (
            <ComboboxItem key={option.value} value={option}>
              {option.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default MultiCombobox
