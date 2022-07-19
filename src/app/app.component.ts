import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileService } from '../app/core/services/file.service';
import { FileCompareDto } from '../app/shared/interfaces';
import { CSVRecord } from './CSVModel';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Marval';
  editableRow = 0;
  currentFiles: File[] = [];

  filesDetails: FileCompareDto[] = [];

  fileUploadForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private fileService: FileService) { }
  public records: any[] = [];  

  @ViewChild('csvReader') csvReader: any;  
  
  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
        Swal.fire(
          'Failed',
          'An error has occured while reading file. Please validate file and try again',
          'error'
        );  
      };  
  
    } else {  
      Swal.fire(
        'Failed',
        'Kindly attach a valid CSV file',
        'error'
      ); 
      this.fileReset();  
    }  
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.identity = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.surname = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.sex = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();  
        csvRecord.active = curruntRecord[6].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
  
  saveFile(): void {

    console.log('file content to send', this.records);
    this.fileService.sendParsedContent(this.records).subscribe(
      (fileDetailsResult:any) =>{
        if(fileDetailsResult){
          Swal.fire(
            'Done',
            'Record saved successfully',
            'success'
          )
          return;
        }
        else{
          Swal.fire(
            'Failed',
            'File not saved. Kindly ensure all fileds have appropriate values',
            'error'
          )
        }
      }
      
     );

  }


  
  deleteRecord(index: number): void {
    if(this.records.length ==1) {  
      
      Swal.fire(
        'Failed',
        'You cannot delete the last standing data',
        'error'
      );  
        return ;  
    } else {  
        this.records.splice(index, 1);  
        Swal.fire(
          'Done',
          'Record deleted successfully',
          'success'
        )
        return ;  
    }  

  }

}
