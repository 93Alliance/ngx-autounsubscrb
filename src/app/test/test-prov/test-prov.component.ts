import { Component, OnInit } from '@angular/core';
import { TestProvService } from '../test-prov.service';

@Component({
  selector: 'app-test-prov',
  templateUrl: './test-prov.component.html',
  styleUrls: ['./test-prov.component.css'],
  providers: [TestProvService]
})
export class TestProvComponent implements OnInit {

  constructor(private testProvService: TestProvService) { }

  ngOnInit(): void {
  }

}
