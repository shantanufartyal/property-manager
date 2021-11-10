import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HandlePropertiesService } from 'src/app/services/handle-properties.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  popupVisible: boolean = false;
  propertyForm: FormGroup;
  properties: any = [];

  constructor(private fb: FormBuilder, private propertiesService: HandlePropertiesService) { }

  ngOnInit(): void {

    this.propertyForm = this.fb.group({
      name: [],
      description: [],
      size: []
    })

    this.propertiesService.getProperties().subscribe((resp: any) => {
      console.log(resp.records)
      resp.records.forEach((element: any) => {
        this.properties.push({ "data": element.fields, "airTableId": element.id });
      });
    })
  }


  deleteProperty(cardData: any) {
    this.propertiesService.deleteProperty(cardData.airTableId).subscribe((resp: any) => {
      this.properties = [];
      this.propertiesService.getProperties().subscribe((resp: any) => {
        console.log(resp.records)
        resp.records.forEach((element: any) => {
          this.properties.push({ "data": element.fields, "airTableId": element.id });
        });
      })
    })
    // let index: number;`
    // index = this.properties.findIndex((x:any) => x.id === cardData.id)
    // console.log(index)
    // this.properties.splice(index, 1)
  }

  addProperty() {
    this.popupVisible = true;
  }

  submit(event: any) {
    console.log(event)
    if (event.validationGroup.validate().isValid) {

      let propertyData = {
        'name': this.propertyForm.value.name,
        'description': this.propertyForm.value.description,
        'size': parseInt(this.propertyForm.value.size)
      }

      this.propertiesService.addProperty(propertyData).subscribe((resp: any) => {
        this.properties = [];
        this.propertiesService.getProperties().subscribe((resp: any) => {
          console.log(resp.records)
          resp.records.forEach((element: any) => {
            this.properties.push({ "data": element.fields, "airTableId": element.id });
          });
        })
      })
      this.popupVisible = false;
      this.propertyForm.reset();
    } else {

    }

  }

}
