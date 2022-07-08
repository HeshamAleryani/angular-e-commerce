import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
  isSuccess: boolean = false;
  constructor() {}

  ngOnInit(): void {
    $('form').form({
      on: 'blur',
      fields: {
        username: {
          identifier: 'paragraph',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter the message ',
            },
          ],
        },
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your name',
            },
          ],
        },

        il: {
          identifier: 'email',
          rules: [
            {
              type: 'email',
              prompt: 'Please enter a valid e-mail',
            },
          ],
        },
      },
      onSuccess: (event: SubmitEvent, fields: Array<any>) => {
        event.preventDefault();
        console.log(fields);
        this.isSuccess = true;
        $('form').form('reset');
      },
    });
  }
}
