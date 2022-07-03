import { forwardRef, useEffect, useMemo, useState } from "react"
import { InputNumber } from "@illa-design/input-number"
import { LoadingIcon } from "@illa-design/icon"
import { WrappedNumberInputProps } from "@/widgetLibrary/NumberInputWidget/interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

const parserThousand = (value: number | string) =>
  `${value}`.replace(/([-+]?\d{3})(?=\d)/g, "$1,")

export const WrappedInputNumber = forwardRef<any, WrappedNumberInputProps>(
  (props, ref) => {
    const {
      openThousandSeparator,
      max,
      min,
      placeholder,
      value,
      precision,
      disabled,
      readOnly,
      prefix,
      suffix,
      loading,
      colorScheme,
      handleUpdateDsl,
    } = props

    const [finalValue, setFinalValue] = useState(value)

    const changeValue = (value: number | undefined) => {
      setFinalValue(value)
      handleUpdateDsl({ value })
    }

    const formatDisplayValue = useMemo(() => {
      return openThousandSeparator ? parserThousand : undefined
    }, [openThousandSeparator])

    useEffect(() => {
      if (finalValue !== value) {
        setFinalValue(value)
      }
    }, [finalValue, value])

    const finalSuffix = useMemo(() => {
      if (loading) {
        return <LoadingIcon spin />
      }
      return suffix
    }, [loading, suffix])

    return (
      <div css={containerStyle}>
        <InputNumber
          max={max}
          min={min}
          formatter={formatDisplayValue}
          placeholder={placeholder}
          value={finalValue}
          precision={Number(precision)}
          disabled={disabled}
          readOnly={readOnly}
          prefix={prefix}
          suffix={finalSuffix}
          mode="button"
          onChange={changeValue}
          borderColor={colorScheme}
        />
      </div>
    )
  },
)

export const NumberInputWidget = WrappedInputNumber
