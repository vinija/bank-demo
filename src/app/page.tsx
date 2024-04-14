"use client";
import "@copilotkit/react-ui/styles.css";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SingleSpreadsheet from "./components/SingleSpreadsheet";
import {
  CopilotKit,
  useCopilotAction,
  useMakeCopilotReadable,
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { INSTRUCTIONS } from "./instructions";
import { canonicalSpreadsheetData } from "./utils/canonicalSpreadsheetData";
import { SpreadsheetData } from "./types";

const HomePage = () => {
  return (
    <CopilotKit url="/api/copilotkit">
      <CopilotSidebar
        instructions={INSTRUCTIONS}
        labels={{
          initial: "Welcome to the spreadsheet app! How can I help you?",
        }}
        defaultOpen={true}
        clickOutsideToClose={false}
      >
        <Main />
      </CopilotSidebar>
    </CopilotKit>
  );
};

const Main = () => {
  const [spreadsheets, setSpreadsheets] = React.useState<SpreadsheetData[]>([
    {
      title: "Spreadsheet 1",
      rows: [
        [{ value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }],
        [{ value: "" }, { value: "" }, { value: "" }],
      ],
    },
  ]);

  const [selectedSpreadsheetIndex, setSelectedSpreadsheetIndex] = useState(0);

  useCopilotAction({
    name: "createSpreadsheet",
    description: "Create a new  spreadsheet",
    parameters: [
      {
        name: "rows",
        type: "object[]",
        description: "The rows of the spreadsheet",
        attributes: [
          {
            name: "cells",
            type: "object[]",
            description: "The cells of the row",
            attributes: [
              {
                name: "value",
                type: "string",
                description: "The value of the cell",
              },
            ],
          },
        ],
      },

      {
        name: "title",
        type: "string",
        description: "The title of the spreadsheet",
      },
    ],
    render: "Creating spreadsheet...",
    handler: ({ rows, title }) => {
      const canonicalRows = canonicalSpreadsheetData(rows);
      const newSpreadsheet: SpreadsheetData = {
        title: title,
        rows: canonicalRows,
      };
      setSpreadsheets((prev) => [...prev, newSpreadsheet]);
      setSelectedSpreadsheetIndex(spreadsheets.length);
    },
  });

  useMakeCopilotReadable("Todays date is: " + new Date().toLocaleDateString());

  return (
    <div className="flex">
      <Sidebar
        spreadsheets={spreadsheets}
        selectedSpreadsheetIndex={selectedSpreadsheetIndex}
        setSelectedSpreadsheetIndex={setSelectedSpreadsheetIndex}
      />
      <SingleSpreadsheet
        spreadsheet={spreadsheets[selectedSpreadsheetIndex]}
        setSpreadsheet={(spreadsheet) => {
          setSpreadsheets((prev) => {
            console.log("setSpreadsheet", spreadsheet);
            const newSpreadsheets = [...prev];
            newSpreadsheets[selectedSpreadsheetIndex] = spreadsheet;
            return newSpreadsheets;
          });
        }}
      />
    </div>
  );
};

export default HomePage;
