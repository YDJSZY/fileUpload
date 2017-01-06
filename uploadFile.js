/**
 * Created by Apple on 17/1/6.
 */
var UploadFile = function (id) {
    this.fileTarget = document.getElementById(id);
    this.inputFile = document.createElement("input");
    this.inputFile.type = "file";
    this.inputFile.style.display = "none";
    this.fileTarget.setAttribute("class","upload-file");
    this.fileTarget.appendChild(this.inputFile);
    this.tip = document.createElement("span");
    this.tipOriginalContent = "请选择文件[可拖动文件至此]";
    this.tip.textContent = this.tipOriginalContent;
    this.removeFileEle = document.createElement("div");
    this.removeFileEle.setAttribute("class","remove-file");
    this.removeFileEle.textContent = "x";
    this.fileTarget.appendChild(this.removeFileEle);
    this.fileTarget.appendChild(this.tip);
    this.render();
};

UploadFile.prototype.render = function () {
    var self = this;
    this.fileTarget.onclick = function () {
        self.inputFile.click();
    }
    this.fileTarget.addEventListener("dragenter", dragenter, false);
    this.fileTarget.addEventListener("dragover", dragover, false);
    this.fileTarget.addEventListener("drop", drop, false);
    
    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    
    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        self.files = dt.files;
        if(self.files.length>0) self.removeFileEle.style.display = "block";
        selectFileCallBack()
    }
    
    function selectFileCallBack () {
        if(self.files[0].type.indexOf("image")==-1){
            var filename = self.files[0].name;
            if(filename.length>30) filename = filename.substr(0,30)+"...";
            self.tip.textContent = filename
        }
    }

    this.removeFileEle.addEventListener("click",function (e){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        self.files.length = 0;
        self.tip.textContent = self.tipOriginalContent;
    },false)
}

UploadFile.prototype.getFiles = function () {
    return this.fileTarget.files;
}