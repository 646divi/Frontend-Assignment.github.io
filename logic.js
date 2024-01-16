function renderLabel(config) {
  let label = document.createElement("label");
  label.htmlFor = "pizzaName";
  label.style.fontSize = "18px";
  label.style.color = "black";
  label.style.margin = "10px";

  label.textContent = config.label;
  if (config.validate && config.validate.required) {
    const asterisk = document.createElement("span");
    asterisk.textContent = " *";
    asterisk.style.color = "red"; 
    label.appendChild(asterisk);
  }
  console.log(label);
  return label;
}

function elementBox() {
  let box = document.createElement("div");
  box.style.border = "1px solid #f6f9fe";
  box.style.padding = "8px";
  // box.style.marginBottom = "5px";
  box.style.margin="5px 20px";
  box.style.backgroundColor = "#fbfdff";
  box.style.borderRadius = "6px";
  return box;
}
function renderTextInput(config) {
  var input = document.createElement("input");
  input.type = "text";
  input.id = "pizzaName";
  input.name = "pizzaName";
  input.style.padding = "8px";
  input.style.marginTop = "5px ";
  input.style.marginLeft="35%"
  input.style.border = "1px solid #eaf1fb";
  input.style.borderRadius = "4px";
  input.style.fontSize = "16px";
  input.placeholder = "Enter Pizza Name";
  input.style.backgroundColor="#f0f7ff";
  input.style.color="#90a7c9";
  input.style.width="30rem";
  input.required = true;
  return input;
}

function renderSelect(config) {
  //let box = document.createElement("div");
  let box = elementBox();
  box.style.display = "flex"
  

  const options = config.validate.options;
  const optionElements = options
    .map((option) => `<option   value="${option}">${option.label}</option>`)
    .join("");

  const selectButtonHTML = `  <label style="width:50%" for="cars">${config.label}</label>
    <select name="cars" id="cars" style="padding: 3px; font-size: 16px; border: 1px solid #eff5fd; border-radius: 3px; background-color:#f0f7ff; width:30rem;">
     ${optionElements}
    </select>`;
  box.innerHTML = selectButtonHTML;

  return box;
}
function renderIgnore(config) {
  //let box = document.createElement("div");
  console.log("ignore wala");
  console.log(config);
  let box = elementBox();
  box.style.display = "flex"
  

  const options = config.validate.options;
  const optionElements = options
    .map((option) => `<option   value="${option.value}">${option.label}</option>`)
    .join("");

  const selectButtonHTML = `  <label style="width:50%" for="cars">${config.label}</label>
    <select name="cars" id="cars" style="padding: 3px; font-size: 16px; border: 1px solid #eff5fd; border-radius: 3px; background-color:#f0f7ff; width:30rem;">
     ${optionElements}
    </select>`;
  box.innerHTML = selectButtonHTML;

  return box;
}

function renderRadio(config) {
  let radioButton = document.createElement("div");
 
 // let radioButton = elementBox();
 
  const options = config.validate.options;
  console.log(options);
  const optionElements = options
    .map(
      (
        option
      ) => `    <input type="radio" name="size" id="size_1" value="small" style="visibility: hidden; height: 0; width: 0;" checked />
    <label for="size_1" style="display: table-cell; vertical-align: middle; text-align: center; cursor: pointer; background-color: #f0f7ff; color: black; padding: 5px 10px; border-radius: 3px;
    border: 1px solid #eff5fd; transition: background-color 0.3s; ">${option.label}</label>
    `
    )
    .join("");
  const radioButtonHTML = ` <div class="center-align" style="display:flex">
   ${optionElements}
</div>`;

  radioButton;
  radioButton.innerHTML = radioButtonHTML;
  radioButton.querySelectorAll("label").forEach(function (label) {
    label.addEventListener("click", function () {
      radioButton.querySelectorAll("label").forEach(function (innerLabel) {
        innerLabel.style.backgroundColor = "#454545";
      });

      label.style.backgroundColor = "#58ba83";
    });
  });

  return radioButton;
}
const formBox = document.querySelector(".form-box");

async function fetchLocalJsonSchema() {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data;
}


document.addEventListener("DOMContentLoaded", async function () {
  const form = document.createElement("form");
  const jsonUISchema = await fetchLocalJsonSchema();
  console.log(jsonUISchema);

  form.textContent = renderLabel("hi");

  jsonUISchema.forEach((item) => {
    const box = elementBox();

    if (item.uiType === "Input") {
      console.log("input");
      box.appendChild(renderLabel(item));
      box.appendChild(renderTextInput(item.label));
      formBox.appendChild(box);
    }

    if (item.uiType === "Group") {
      console.log("group");
      box.appendChild(renderLabel(item))
      formBox.appendChild(box);
      console.log(item.label);

      item.subParameters.forEach((subItem) => {
        if (subItem.uiType === "Input") {
          console.log("input");
          box.appendChild(renderLabel(item));
          box.appendChild(renderTextInput(item.label));
        }
        if(subItem.uiType === "Ignore" && subItem.subParameters[0].label==="Slices"){
          // console.log("ignore input");
          box.appendChild(renderIgnore(subItem.subParameters[0]));
        }
        if (subItem.uiType === "Select") {
          console.log(`select + ${subItem.label}`);

          box.appendChild(renderSelect(subItem));
        }
        if (subItem.uiType === "Radio") {
          console.log("radio");
        //  box.appendChild(renderLabel(item));
          box.appendChild(renderRadio(subItem));
        }

    
      });

      formBox.appendChild(box);
    }

    if (item.uiType === "Select") {
      box.appendChild(renderSelect(item));
      formBox.appendChild(box);
    }
    if (item.uiType === "Radio") {
      box.appendChild(renderLabel(item));

      box.appendChild(renderRadio(item));
      formBox.appendChild(box);
    }

   
  });
});

// const formBuilder = function () {
//   console.log("create form");

//   // function initialState(inputs) {
//   //     return inputs.reduce((state,config) => {
//   //         state[config.id] = config.defau
//   //     })
//   // }

//   function renderForm() {}

//   function renderTextInput(config) {
//     var input = document.createElement("input");
//     input.type = "text";
//     input.id = "pizzaName";
//     input.name = "pizzaName";
//     input.style.padding = "8px";
//     input.style.marginTop = "5px";
//     input.style.border = "1px solid #ccc";
//     input.style.borderRadius = "4px";
//     input.style.fontSize = "16px";
//     input.placeholder = "Enter Pizza Name";
//     input.required = true;
//     return input;
//   }

//   function renderTextInput() {
//     var container = document.createElement("div");
//     container.style.margin = "20px";
//     container.style.width = "300px";
//     container.style.display = "flex";
//     container.style.flexDirection = "column";

//     // Create label
//     var label = document.createElement("label");
//     label.htmlFor = "pizzaName";
//     label.style.fontSize = "18px";
//     label.style.color = "#333";
//     label.style.marginBottom = "5px";
//     label.textContent = "Pizza Name *";

//     // Create input
//     var input = document.createElement("input");
//     input.type = "text";
//     input.id = "pizzaName";
//     input.name = "pizzaName";
//     input.style.padding = "8px";
//     input.style.marginTop = "5px";
//     input.style.border = "1px solid #ccc";
//     input.style.borderRadius = "4px";
//     input.style.fontSize = "16px";
//     input.placeholder = "Enter Pizza Name";
//     input.required = true;

//     // Append label and input to container
//     container.appendChild(label);
//     container.appendChild(input);

//     document.body.appendChild(container);
//   }
// };
