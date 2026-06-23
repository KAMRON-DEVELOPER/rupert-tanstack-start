import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox'

export type ComboboxOption<Value extends string = string> = {
  value: Value
  label: string
}

type SingleComboboxProps<Value extends string> = {
  id: string
  options: ComboboxOption<Value>[]
  value: Value | null | undefined
  placeholder: string
  emptyLabel?: string
  disabled?: boolean
  onChange: (value: Value | null) => void
}

function SingleCombobox<Value extends string>({
  id,
  options,
  value,
  placeholder,
  emptyLabel = 'No results found',
  disabled = false,
  onChange
}: SingleComboboxProps<Value>) {
  const selectedOption = options.find((option) => option.value === value) ?? null

  return (
    <Combobox
      items={options}
      value={selectedOption}
      disabled={disabled}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.label}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      onValueChange={(option) => onChange(option?.value ?? null)}
    >
      <ComboboxInput
        id={id}
        className="w-full"
        placeholder={placeholder}
        showClear={Boolean(selectedOption)}
        disabled={disabled}
      />
      <ComboboxContent>
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

export default SingleCombobox
