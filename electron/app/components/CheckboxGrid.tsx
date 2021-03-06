import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const CHECKBOX_SIZE = 24;
const CHECKBOX_PADDING = 3;
const CHECKBOX_TOTAL_SIZE = CHECKBOX_SIZE + 2 * CHECKBOX_PADDING;
const LABEL_PADDING_RIGHT = 6;

const Body = styled.div`
  vertical-align: middle;

  label {
    width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 0;
    margin-right: 0;

    .MuiTypography-body1 {
      font-size: unset;
    }

    .MuiCheckbox-root {
      padding: ${CHECKBOX_PADDING}px;

      .MuiIconButton-label {
        position: relative;
        svg {
          z-index: 1;
        }
      }

      &.Mui-checked .MuiIconButton-label::after {
          /* fill checkmark with font color */
          content: "";
          position: absolute;
          background: ${({ theme }) => theme.font};
          top: 0.2em;
          left: 0.2em;
          width: 0.6em;
          height: 0.6em;
          z-index: 0;
        }
      }
    }

    .MuiFormControlLabel-label {
      display: inline-flex;
      min-width: 100%;
      font-weight: bold;
      padding-right: ${CHECKBOX_TOTAL_SIZE + LABEL_PADDING_RIGHT}px;
      color: unset;

      span {
        display: inline-block;
      }

      span.name {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
      }

      span.data {
        margin-left: 0.5em;
      }
    }
  }

  && .Mui-disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.fontDarkest};

    svg, input[type=checkbox] {
      display: none;
    }

    .MuiFormControlLabel-label {
      padding-right: ${LABEL_PADDING_RIGHT + 2 * CHECKBOX_PADDING}px;
    }
  }
`;

export type Entry = {
  name: string;
  selected: boolean;
  data: Any;
  color: string;
  disabled: boolean;
};

type Props = {
  entries: Entry[];
  onCheck: (entry: Entry) => void;
};

const CheckboxGrid = ({ entries, onCheck }: Props) => {
  const theme = useContext(ThemeContext);

  const handleCheck = (entry) => {
    if (onCheck) {
      onCheck({ ...entry, selected: !entry.selected });
    }
  };

  return (
    <Body>
      {entries.map((entry) => (
        <div key={entry.name}>
          <FormControlLabel
            disabled={entry.disabled}
            label={
              <>
                <span className="name" title={entry.name}>
                  {entry.name}
                </span>
                <span className="data">{entry.data}</span>
              </>
            }
            style={{
              backgroundColor: entry.selected
                ? theme.backgroundLight
                : undefined,
              color: entry.selected
                ? theme.font
                : entry.disabled
                ? theme.fontDarkest
                : theme.fontDark,
            }}
            control={
              <Checkbox
                checked={entry.selected}
                onChange={() => handleCheck(entry)}
                style={{
                  color: entry.selected
                    ? entry.color
                    : entry.disabled
                    ? theme.fontDarkest
                    : theme.fontDark,
                }}
              />
            }
          />
        </div>
      ))}
    </Body>
  );
};

export default CheckboxGrid;
