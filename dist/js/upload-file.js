/**
 * Created by Apple on 17/1/6.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
            (global.UploadFile = factory());
}(this,function () {
    var UploadFile = function (id) {
        this.fileTarget = document.getElementById(id);
        this.inputFile = document.createElement("input");
        this.inputFile.type = "file";
        this.inputFile.style.display = "none";
        this.fileTarget.setAttribute("class","upload-file");
        this.fileTarget.appendChild(this.inputFile);
        this.tip = document.createElement("span");
        this.tipOriginalContent = "请选择文件[可拖动文件至此]";
        this.tip.setAttribute("class","tip");
        this.tip.textContent = this.tipOriginalContent;
        this.removeFileEle = document.createElement("div");
        this.removeFileEle.setAttribute("class","remove-file");
        this.removeFileEle.textContent = "x";
        this.fileTarget.appendChild(this.removeFileEle);
        this.fileTarget.appendChild(this.tip);
        this.fileImg = document.createElement("img");
        this.fileImg.setAttribute("class","file-img");
        this.fileTarget.appendChild(this.fileImg);
        this.files = [];
        this.render();
    };

    UploadFile.prototype.render = function () {
        var self = this;

        this.fileTarget.onclick = function () {
            self.inputFile.click();
        }

        this.fileTarget.addEventListener("change",selectFileCallBack,false)
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
            self.files = [dt.files[0]];
            selectFileCallBack()
        }

        function selectFileCallBack (files) {
            self.files = files && files.target.files.length>0 ? [files.target.files[0]] : self.files;
            if(self.files.length==0) return;
            if(self.files[0].type.indexOf("image")==-1){
                var filename = self.files[0].name;
                if(filename.length>30) filename = filename.substr(0,30)+"...";
                self.tip.textContent = filename;
                self.fileImg.style.display = "none";
                self.tip.style.display = "block";
            }else{
                if(window.FileReader) {
                    var oFReader = new FileReader();
                    oFReader.onloadend = function(e) {
                        self.fileImg.src = e.target.result;
                        self.fileImg.style.display = "block";
                    };
                    oFReader.readAsDataURL(self.files[0]);
                    self.tip.style.display = "none";
                }
            }
            self.removeFileEle.style.display = "block";
        }

        this.removeFileEle.addEventListener("click",function (e){
            window.event? window.event.cancelBubble = true : e.stopPropagation();
            self.files.length = 0;
            self.tip.textContent = self.tipOriginalContent;
            self.tip.style.display = "block";
            self.removeFileEle.style.display = "none";
            self.fileImg.style.display = "none";
        },false)
    }

    UploadFile.prototype.getFiles = function () {
        return this.files[0];
    };

    return UploadFile;
}))
