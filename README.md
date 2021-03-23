# sv-bootstrap-modal (Svelte Bootstrap Modal)
Svelte Modal Component for Bootstrap (Bootstrap’s modal plugin in svlete applications), can be used with sapper or standalone with svelte
### Demo
[Simple Bootstrap Modal Example](https://svelte.dev/repl/27a9b36c6b2a48fb9c98fd9358a8861e?version=3.22.3)
## How to install
```npm install --save-dev sv-bootstrap-modal```

### Requirements
Bootstrap CSS needs to be present globally in project


## Usage

### Simple Usage

#### Example
```html
<script>
  import Modal from "sv-bootstrap-modal";
  let isOpen = false;
</script>

<Modal bind:open={isOpen}>
    <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" on:click={() => (isOpen = false)}>
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">Woohoo, you're reading this text in a modal!</div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" on:click={() => (isOpen = false)}>Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
    </div>
</Modal>

<button class="btn btn-primary" on:click={()=> (isOpen = true)}>Open Modal</button>

```

### Modal Sizing
Below are the classes which should be used to change the sizes of modal
|Small|Large|Extra large|
|---|---|---|
|  .modal-sm |  .modal-lg | .modal-xl  |

#### Example
```html
<script>
  import Modal from "sv-bootstrap-modal";
  let isOpen = false;
</script>

<Modal bind:open={isOpen} dialogClasses="modal-lg">
    ....
</Modal>

<button class="btn btn-primary" on:click={()=> (isOpen = true)}>Open Modal</button>
```

### Vertically centered
Add `modal-dialog-centered` to `dialogClasses` option

#### Example
```html
<script>
  import Modal from "sv-bootstrap-modal";
  let isOpen = false;
</script>

<Modal bind:open={isOpen} dialogClasses="modal-dialog-centered">
    ....
</Modal>

<button class="btn btn-primary" on:click={()=> (isOpen = true)}>Open Modal</button>
```

### Scrolling long content (Scrollable Modal)
Add `modal-dialog-scrollable` to `dialogClasses` option

```html
<script>
  import Modal from "sv-bootstrap-modal";
  let isOpen = false;
</script>

<Modal bind:open={isOpen} dialogClasses="modal-dialog-scrollable">
    ....
</Modal>

<button class="btn btn-primary" on:click={()=> (isOpen = true)}>Open Modal</button>
```

### Component Options
|Name|Type|Default|Description|
|--- |--- |--- |--- |
|backdrop|boolean|true|Includes a modal-backdrop element.|
|ignoreBackdrop|boolean|true|It will ignore backdrop click close if `true` modal will not close on outside click|
|keyboard|boolean|true|Closes the modal when escape key is pressed|
|dialogClasses|string|""|You can add any number of classes to `.modal-dialog` element|
|labelledby|string|""|Used for aria-labelledby|
|describedby|string|""|Used for aria-describedby|
|onOpened|function|Empty function(noop)|Can be Used for callbacks After Modal Opened|
|onClosed|function|Empty function(noop)|Can be Used for callbacks After Modal Closed|

## License
[Apache License 2.0](https://github.com/Sidd27/sv-bootstrap-modal/blob/master/LICENSE)
