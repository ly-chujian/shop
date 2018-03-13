/**
 * Created by wupeng5 on 2017/12/21.
 */

/*
* 实例化 tools
* 实例化 proxyImage
*
* 初始化init方法接受2个参数，imgs的dom元素数组，link为真实图片路径数组，tools为辅助工具
* */

/*
 * 具体demo如下：
var tools = new LazyTools();
var proxyImage = new ProxyImage();

var imgArray = [];
var linkArray = [];
$("#d img").each(function(){
    imgArray.push(this);
    linkArray.push($(this).attr("_src"));
})

proxyImage.init(imgArray,linkArray,tools);
* */
var MyImg = function(el){
    var that = this;
    var handle = function(){
        console.log(this.id + " img already load completed");
    }
    this.el = el;
    that.el.addEventListener("load",handle,false);
    this.setSrc = function(data){
        data.el.src = data.src;
    }
    this.destroy = function(){
        that.el.removeListener("load",handle);
    }
}

var LazyTools = function(){
    this.loading = {};
    this.loading.loadImg = "https://p3.lefile.cn/product/adminweb/2017/12/18/524863a2-2754-4238-8d0a-4e5a611f3804.gif";
    this.loading.setLoadImg = function(newSrc){
        this.loading.loadImg = newSrc;
    }
    this.loading.setElLoading = function(el){
        el.src = this.loading.loadImg;
    }

    this.batchTask = {};
    this.batchTask.do = function(array,process,completedCb,context){
        var item = array.shift();
        process.call(context,item);
        if(array.length == 0){
            completedCb.call(context);
        }
        if(array.length >0){
            var that = this;
            var arg = arguments;
            setTimeout(function(){
                arg.callee.apply(that,arg);
            },10);
        }
    }
}

var ProxyImage = function(){
    var that = this;
    this.srcList = [];
    this.myImgList = [];
    this.loadImgCompleted = false;
    this.srcImgCompleted = false;

    this.setSrc = function(){
        var data = [];
        for(var i=0;i<this.myImgList.length;i++){
            data.push({el:this.myImgList[i].el,src:this.srcList[i]});
        }
        if(data.length!=0){
            this.tools.batchTask.do(data,this.myImgList[0].setSrc,function(){
                this.srcImgCompleted = true;
                console.log("SRC ready get link, ready to render!");
            },this);
        }
    }

    this.destroy = function(){
        for(var i=0;i<this.myImgList.length;i++){
            this.myImgList[i].destroy();
        }
        this.srcList = [];
        this.myImgList = [];
    }

    this.init = function(imgEls,links,tools){
        for(var i=0;i<imgEls.length;i++){
            this.myImgList.push(new MyImg(imgEls[i]));
        }
        this.srcList = links;
        this.tools  = tools;
        this.tools.batchTask.do(imgEls,this.tools.loading.setElLoading,function(){
            that.loadImgCompleted = true;
            console.log("LOADING ready get link, ready to render!!");
            that.setSrc();
        },tools);
        return this;
    }
}

//export {MyImg , LazyTools, ProxyImage};
