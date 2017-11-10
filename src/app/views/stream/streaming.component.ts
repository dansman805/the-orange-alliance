import { Component, OnInit } from '@angular/core';
import { FTCDatabase } from '../../providers/ftc-database';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class StreamType {
  static YOUTUBE = 0;
  static TWITCH = 1;
  static CUSTOM = 2;
}

@Component({
  selector: 'toa-streaming',
  templateUrl: './streaming.component.html',
  providers: [FTCDatabase]
})
export class StreamingComponent implements OnInit {

  streams: any[];

  constructor(private ftc: FTCDatabase, private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.ftc.getAllStreams().subscribe((data) => {
      this.streams = data;

      for (let stream of this.streams) {
        stream.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(stream.stream_url);
      }

    }, (err) => {
      console.log(err);
    });
  }

}
