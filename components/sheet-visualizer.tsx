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
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(process.env.NEXT_PUBLIC_EJ2_LICENSE_KEY || "");

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
    <SpreadsheetComponent
      saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
      openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
      ref={(Obj: any) => {
        spreadsheet = Obj as SpreadsheetComponent;
      }}
      created={onCreated.bind(this)}
      allowEditing={false}
      allowFindAndReplace={false}
      allowInsert={false}
      allowAutoFill={false}
      allowOpen={false}
      allowUndoRedo={false}
      allowDelete={false}
      allowChart={false}
      allowHyperlink={false}
      allowImage={false}
      className="h-full w-full"
      fileMenuBeforeOpen={() => {
        spreadsheet.hideFileMenuItems(["New", "Open"], true);
      }}
    >
      <SheetsDirective>
        <SheetDirective name="Car Sales Report">
          <RangesDirective>
            <RangeDirective dataSource={defaultVisualizerData}></RangeDirective>
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
  );
}
