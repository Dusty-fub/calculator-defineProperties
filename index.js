class compute {
  plus(a, b) {
    return a + b;
  }
  minus(a, b) {
    return a - b;
  }

  mul(a, b) {
    return a * b;
  }
  div(a, b) {
    return a / b;
  }
}
class Calculator extends compute {
  constructor(doc) {
    super();
    const ocl = doc.getElementsByClassName("Calculator")[0];

    this.fInput = doc.querySelectorAll("input")[0];
    this.sInput = doc.getElementsByTagName("input")[1];
    this.oBtnGroup = doc.querySelectorAll(".btn-group")[0];
    this.oBtnItems = doc.querySelectorAll(".btn-group>button");
    this.oResult = doc.querySelectorAll(".result")[0];

    this.Data = this.defineData();
    this.btnIdx = 0;
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.oBtnGroup.addEventListener(
      "click",
      this.onFieldBtnClick.bind(this),
      false
    );

    this.fInput.addEventListener("input", this.onNumberInput.bind(this), false);
    this.sInput.addEventListener("input", this.onNumberInput.bind(this), false);
  }

  onNumberInput(ev) {
    const e = ev || window.Event;
    const tar = e.target || e.srcElement;
    const className = tar.className;
    const val = Number(tar.value.replace(/\s+/g, "")) || 0;
    switch (className) {
      case "f-input":
        this.Data.fNumber = val;
        break;
      case "s-input":
        this.Data.sNumber = val;
        break;
      default:
        break;
    }
  }

  onFieldBtnClick(ev) {
    const e = ev || window.Event;
    const tar = e.target || e.srcElement;
    const tagName = tar.tagName.toLowerCase();
    tagName === "button" && this.fieldUpdate(tar);
  }

  fieldUpdate(target) {
    this.oBtnItems[this.btnIdx].className = "";
    this.btnIdx = [].indexOf.call(this.oBtnItems, target);
    target.className += " current";
    this.Data.field = target.getAttribute("data-field");
  }

  defineData() {
    let _obj = {};

    let fNumber = 0;
    let sNumber = 0;
    let field = "plus";

    let _self = this;

    Object.defineProperties(_obj, {
      fNumber: {
        get() {
          return fNumber;
        },
        set(newVal) {
          fNumber = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
      sNumber: {
        get() {
          return sNumber;
        },
        set(newVal) {
          sNumber = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
      field: {
        get() {
          return field;
        },
        set(newVal) {
          field = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
    });
    return _obj;
  }
  computeResult(fNumber, sNumber, field) {
    this.oResult.innerText = this[field](fNumber, sNumber);
  }
}

new Calculator(document).init();
