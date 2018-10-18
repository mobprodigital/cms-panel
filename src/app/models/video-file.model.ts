export class VideoFileModel{
    public videoId: string = '';
    public videoLength: number = 0;
    public extension: string = '';
    public videoMime: string = '';
    public videoFile: File = null;
    public thumbnail: File = null;
}