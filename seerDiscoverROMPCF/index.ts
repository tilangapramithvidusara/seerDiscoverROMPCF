/* eslint-disable no-unreachable */
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
// import { Xrm } from "./global";
// import { fetchRecords } from "./requests";
import toJsonSchema = require("to-json-schema");

// declare global {
//     interface Window {
//       Xrm: any;
//     }
// }
export class seerDiscoverROMPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private response : any;
    private fetchXml: any;
    private entityName: any;
    private outputSchema ?: toJsonSchema.JSONSchema3or4;
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.notifyOutputChanged = notifyOutputChanged;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement
    {
        console.log('entity name : ', context?.parameters?.entityName?.raw)
        console.log('account id : ', context?.parameters?.accountId?.raw)
        console.log('report id : ', context?.parameters?.reportId.raw)

        // this.jsonLoader();
        const reportId = context?.parameters?.reportId?.raw;
        const accountId = context?.parameters?.accountId?.raw;
        this.dataLoad(reportId, accountId, context)
        return React.createElement(React.Fragment);
    }

    async dataLoad(reportId: any, accountId: any, context: ComponentFramework.Context<IInputs>) {
        const urlsData = await this.getUrls(reportId, context);

        const {error, result} = urlsData
        if (!error) {
            const entities: any = result?.entities;
            
            const data = entities[0];
            
            await this.jsonLoader(data, accountId);
        } else {
            if(result instanceof Error){
                if(result?.name === "PCFNonImplementedError"){       
                    const data = {
                        "@odata.etag": "W/\"115657148\"",
                        "seerdwp_rompcfconfigurationid": "bd1b3f25-e43c-ee11-bdf4-002248015a1b",
                        "seerdwp_functionappurl": "https://seerv2samplefunctions.azurewebsites.net/api/GetRomData?code=-MzCAimwQEWOrW4ZNgz8ZbETkcPy0LUzQtGMGVOQXpCiAzFupB0xYA==",
                        "seerdwp_jasonobjectformat": "{\n\"id\": \"accountId\"\n}",
                        "seerdwp_reportid": "testROMReport"
                      };
                    console.log("data ", data);
                        
                    await this.jsonLoader(data, accountId);
                }
            }
        }
    }

    async getUrls(reportId: any, context: ComponentFramework.Context<IInputs>){ 
        //testROMReport
        
        let returnMethod: any = {}
        try {
            

            let result = await context?.webAPI?.retrieveMultipleRecords(
                "seerdwp_rompcfconfiguration", 
                `?$select=seerdwp_rompcfconfigurationid,seerdwp_functionappurl,seerdwp_jasonobjectformat,seerdwp_reportid&$filter=seerdwp_reportid eq '${reportId}'`
            );
            const res: any = result
            returnMethod = {error: false, result: res};
        } catch (error: any) {
            console.log("error when load urls : ", error, error instanceof Error);
            returnMethod = {error: true, result: error}
            
        }
        return returnMethod;
    }

    async jsonLoader(data?: any, accountId?: any) {
        // context: ComponentFramework.Context<IInputs>
        
        const jsonFormat = JSON.parse(data?.['seerdwp_jasonobjectformat']?.trim());
        if (jsonFormat?.['id'] === "accountId") {
            jsonFormat['id'] = accountId;
        }
        console.log("jsonFormat ===> ", jsonFormat, data);
        
        var raw = JSON.stringify(jsonFormat);

        var requestOptions: any = {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:raw,
            redirect:'follow'
        };

        fetch(
            data?.["seerdwp_functionappurl"], 
            requestOptions
        )
        .then(response=>response.json())
        .then((result: any)=> {

            // console.log(result)
            console.log('====> ', result && result?.data && result?.data?.length > 0, result?.data);
            
            if (result && result?.data && result?.data?.length > 0) {
                this.response = JSON.stringify(result?.data)
                // {...result.data}
                // ?.data
                // JSON.stringify(result?.data)
                if(this.outputSchema == null){
                    this.outputSchema = toJsonSchema(result.data);
                    // ?.data
                }
                // console.log('JSON.stringify(result?.Data', JSON.stringify(result?.data));
                this.notifyOutputChanged();
                // this.getOutputSchema(context);
                // this.getOutputs();
            }

        })
        .catch(error=>console.log('error',error));
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { output: this.response };
    }
    // public getOutputs(): IOutputs
    // {
    //     return { 
    //         output: this.response, 
    //         outputSchema : JSON.stringify(this.outputSchema)
    //      };
    // }

    // public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<any> {
    //     return Promise.resolve({
    //         output: this.outputSchema
    //     });
    // }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
