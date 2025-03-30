"use client";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  CellStyleModel,
  ColumnDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import { defaultVisualizerData } from "@/constants/projects";

export default function (this: any) {
  let spreadsheet!: SpreadsheetComponent;
  const boldRight: CellStyleModel = { fontWeight: "bold", textAlign: "right" };
  const bold: CellStyleModel = { fontWeight: "bold" };

  function onCreated(): void {
    spreadsheet.cellFormat(
      { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
      "A1:F1"
    );
    spreadsheet.numberFormat("$#,##0.00", "F2:F31");
  }

  return (
    <>
      <h2>Syncfusion React Spreadsheet Component</h2>
      <SpreadsheetComponent
        openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
        saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
        ref={(Obj: any) => {
          spreadsheet = Obj as SpreadsheetComponent;
        }}
        created={onCreated.bind(this)}
      >
        <SheetsDirective>
          <SheetDirective name="Car Sales Report">
            <RangesDirective>
              <RangeDirective
                dataSource={defaultVisualizerData}
              ></RangeDirective>
            </RangesDirective>
            <RowsDirective>
              <RowDirective index={30}>
                <CellsDirective>
                  <CellDirective
                    index={4}
                    value="Total Amount:"
                    style={boldRight}
                  ></CellDirective>
                  <CellDirective
                    formula="=SUM(F2:F30)"
                    style={bold}
                  ></CellDirective>
                </CellsDirective>
              </RowDirective>
            </RowsDirective>
            <ColumnsDirective>
              <ColumnDirective width={180}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={180}></ColumnDirective>
              <ColumnDirective width={130}></ColumnDirective>
              <ColumnDirective width={120}></ColumnDirective>
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </>
  );
}
