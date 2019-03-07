'use strict';
const defaultMenuWork26 = $('#Menu').find('li[data-work="26"]');
const tabletMenuWork26 = $('#Menu--tablet').find('li[data-work="26"]');

defaultMenuWork26.on('click', renderHW_26);
tabletMenuWork26.on('click', renderHW_26);


function createCustomInput ({
                              type = text,
                              placeholder = '',
                              value = '',
                              label = false,
                              inputClass = 'CustomInput',
                              name,
                              autocomplete = 'off',
                              required = false
                            }) {
  const inputWrapper = $(document.createElement('div'));
  const activeBar = $(document.createElement('div'));
  let submitText;
  let labelElement;
  let input = $(document.createElement('input'));

  inputWrapper.addClass(inputClass);
  activeBar.addClass(inputClass + '-bar');

  if (type === 'submit') {
    input = $(document.createElement('button'));
    submitText = $(document.createElement('span')).appendTo(input);
    submitText.text(value);
    submitText.addClass('CustomInput-submitText');
    input.attr('type','submit');
    input.addClass('CustomInput-submit');
    input.appendTo(inputWrapper);
    return inputWrapper;
  }

  if (label) {
    labelElement = $(document.createElement('span')).addClass(inputClass + '-label').text(label).appendTo(inputWrapper);
  }

  input.appendTo(inputWrapper);
  input.addClass(inputClass + '-input');
  input.attr('placeholder', placeholder);
  input.attr('type', type);
  input.attr('autocomplete', autocomplete);
  input.attr('value', value);

  input.on({
    focus: () => inputWrapper.addClass('is-focused'),
    blur: () => inputWrapper.removeClass('is-focused'),
    keyup: () => {
      if(input.val().length) {
        inputWrapper.addClass('is-filled');
      } else {
        inputWrapper.removeClass('is-filled');
      }
    }
  });

  activeBar.appendTo(inputWrapper);

  if (typeof name === 'string') {
    input.attr('name', name);
  } else {
    throw new Error('Input TypeError: missing required name parameter');
  }

  if (required) {
    input.attr('_required', '');
  }

  return inputWrapper;
}

function renderHW_26 (e) {
  const task = e.target.closest('li.Menu-item');
  let taskNumber;

    // Validate item link
    if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
        return;
    }

    taskNumber = parseInt(task.dataset.task);


  switch (taskNumber) {
    case 1:
      HW_26.task1.render();
      break;

        default:
            alert('This task doesn\'t exist :(');
    }
}

class SnackBar {
    constructor({
                    name,
                    timeout = true,
                    progressbar = true,
                    keepAlive = 4000,
                    confirm = true,
                    resolveText = 'resolve',
                    rejectText = 'reject',
                    message = ['Default snackbar message']
                }) {
        const snackbar = $(document.createElement('div'));
        const snackbarWrapper = $(document.createElement('div')).appendTo(snackbar);
        let snackbarMessage;

        let buttonWrapper;
        let rejectButton;
        let resolveButton;
        let progressBar;

        this.timeout = timeout;
        this.keepAlive = keepAlive;
        this._snackbar = snackbar;

        snackbar.addClass('Snackbar');
        snackbarWrapper.addClass('Snackbar-wrapper');

        message.forEach((text, index) => {
            snackbarMessage = $(document.createElement('p')).appendTo(snackbarWrapper);
            snackbarMessage.addClass('Snackbar-message');
            snackbarMessage.text(text);

        });

        if (name && typeof (name) === 'string') {
            snackbar.attr('data-snackbar', name);
        }

        if (confirm) {
            buttonWrapper = $(document.createElement('div')).appendTo(snackbarWrapper);
            rejectButton = $(document.createElement('button')).appendTo(buttonWrapper);
            resolveButton = $(document.createElement('button')).appendTo(buttonWrapper);

            buttonWrapper.addClass('Snackbar-buttonWrapper');
            resolveButton.addClass('Button Button--snackbarResolve');
            rejectButton.addClass('Button Button--snackbarReject');

            resolveButton.text(resolveText);
            rejectButton.text(rejectText);

            this._resolveButton = resolveButton;
            this._rejectButton = rejectButton;

            resolveButton.on('click', this.hide.bind(this));
            rejectButton.on('click', this.hide.bind(this));
        }

        if (progressbar) {
            progressBar = $(document.createElement('div')).appendTo(snackbarWrapper);
            progressBar.addClass('Snackbar-progressBar');
            this.progressBar = progressBar;
        }
    }

    show() {
        const self = this;
        this._snackbar.addClass('is-active');
        if (this.progressBar) {
            this.progressBar.css('transition', `width ${this.keepAlive || 4000}ms linear`).css('width', '0');
            this.progressBar.one('transitionend', (e) => {
                e.stopPropagation();
                self.hide();
            });
        }

        if (this.timeout && this.progressBar === undefined) {
            setTimeout(this.hide, this.keepAlive);
        }
    }

    hide() {
        const self = this;
        this._snackbar.removeClass('is-active');

        if (this.progressBar !== undefined) {
            this._snackbar.one('transitionend', () => {
                self.progressBar.attr('style', '');
            });
        }
    }
}

class EventEmitter {
  constructor () {
    this._events = {}
  }

  // Add custom event and his function listener
  // event - string, listener - function
  on (event, listener, context) {
    if (context === undefined) {
      throw new Error('EventEmiter TypeError: missing required context parameter');
    }

    if (typeof context !== 'object') {
      throw new Error('EventEmiter InputError: required context parameter has invalid type');
    }
    (this._events[event] || (this._events[event] = [])).push(listener.bind(context));
  }

  // Run custom event
  // event - string, args - array
  emit (event, ...args) {
    if (!this._events[event]) {
        throw new Error('Emitter error, called event hasn\'t registered handlers');
    }
        this._events[event].forEach(listener => listener.apply(null, args));
    }
}

class StudentsModel extends EventEmitter {
    constructor(students = []) {
        super();
        this._students = students;

        let uniqueID = 0;

        this.constructor.generateUniqueId = function () {
            return uniqueID++;
        }
    }

    get studentsList() {
        return this._students;
    }

    uploadData (xhr) {
        if (typeof xhr === 'string') {
            $.ajax({
                url: xhr,
                method: 'GET',
                context: this,
                success: response => {
                    response.forEach(student => {
                        this.addStudent(student);
                    });
                },
                error: error => {
                    console.log(error);
                }
            });
        }
    }

    addStudent (student) {
        student._studentId = this.constructor.generateUniqueId();
        this._students.push(student);
        this.emit('studentAdded', student);
    }

    deleteStudent (id) {
        const studentsList = this._students;
        let i;

        for (i = 0; i < studentsList.length; i++) {
           if(studentsList[i]._studentId === id) {
               studentsList.splice(i, 1);
               this.emit('studentDeleted', id);
               return;
           }
        }

        throw new Error('Model ReferenceError: reference to a non-existent student ID');
    }
}

class StudentsView extends EventEmitter {
    constructor() {
        super();
        this._elements = {};
        this._icons = {};
        this._timeouts = {};
        this._confirms = {};
        this._elements.form = this.constructor.createAddForm();
        this._elements.table = this.constructor.createTable.call(this);



        this._icons.edit = $('<svg xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 55.25 55.25"> <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" data-original="#000000" data-old_color="#ffffff" fill="#fff"/> </svg>');
        this._icons.delete = $('<svg xmlns="http://www.w3.org/2000/svg" width="20px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 774.266 774.266" style="enable-background:new 0 0 774.266 774.266;" xml:space="preserve"><g><g> <g> <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/> <rect x="475.031" y="286.593" width="48.418" height="396.942" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/> <rect x="363.361" y="286.593" width="48.418" height="396.942" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/> <rect x="251.69" y="286.593" width="48.418" height="396.942" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/> </g> </g></g> </svg>');

        // Private Properties
        let _isChange = false;
        this.getStateChange = function () {
            return _isChange;
        };
        this.setStateChange = function (boolean) {
            if (typeof boolean === 'boolean') {
                _isChange = boolean;
            } else {
                throw Error('Viewmodel: input error, state must be boolean');
            }
        };
    }

    get getStudentsFormElement() {
        return this._elements.form;
    }

    get getStudentsTableElement() {
        return this._elements.table;
    }

    renderForm (container) {
        let containerElement;
        if (container instanceof HTMLElement) {
            $(this._elements.form).appendTo(container);
        } else {
            containerElement = $(container);

            if (containerElement.length) {
                $(this._elements.form).appendTo(containerElement.length === 1
                    ? containerElement
                    : document.querySelector(container));
            }
        }

        this.constructor.enableFormActions.call(this);
    }

    renderTable (container) {
        let containerElement;
        if (container instanceof HTMLElement) {
            $(this._elements.table).appendTo(container);
            return;
        }

        containerElement = $(container);

        if (containerElement.length) {
            $(this._elements.table).appendTo(containerElement.length === 1
                ? containerElement
                : document.querySelector(container));
        }
    }

    addStudent (studentObj) {
        clearTimeout(this._timeouts.addStudent);
        const newStudentTR = this.constructor.createStudentTR.call(this, studentObj);
        this._elements.list.prepend(newStudentTR);
        this._timeouts.addStudent = setTimeout(this.constructor.updateIndexes.call(this), 100);
        this.setStateChange(false);
    }

    removeStudent (index) {
        this._deletingStudent.remove();
        this.constructor.updateStudentsIndexes.call(this);
        this.setStateChange(false);
    }

    static enableFormActions() {
        this._elements.form.submit(
            (e) => {
                e.preventDefault();

                if (this.getStateChange()) {
                    return;
                } else {
                    this.setStateChange(true);
                }

                this.emit('addStudentRequest', $(this._elements.form).serializeArray());
            });
    }

    static createAddForm () {
        const form = $('<form/>', {
            method: 'POST',
            class: 'Task-addStudentForm'
        });
        const inputs = [
            {
                label: 'Name',
                type: 'text',
                name: 'name',
                required: true
            },
            {
                label: 'Age',
                type: 'text',
                name: 'age',
                required: true
            },
            {
                label: 'Specialization',
                type: 'text',
                name: 'specialization',
                required: true
            },
            {
                label: 'Studying year',
                type: 'text',
                name: 'year',
                required: true
            },
            {
                label: 'Website',
                type: 'text',
                name: 'website',
                required: true
            },
            {
                label: 'Phone number',
                type: 'text',
                name: 'phone',
                required: true
            },
            {
                type: 'submit',
                value: 'Add',
            }
        ];
        const row = $('<div/>').addClass('row').appendTo(form);
        let mediaContainer;

        inputs.forEach(inputOptions => {
            mediaContainer = $(document.createElement('div')).appendTo(row);
            mediaContainer.addClass('cell-4');
            createCustomInput(inputOptions).appendTo(mediaContainer);
        });

        mediaContainer.removeClass('cell-4').addClass('cell-12');

        return form;
    }

    static createTable () {
        const table = $('<table>', {
            class: 'Task-table'
        });
        const thead = $(document.createElement('thead')).appendTo(table);
        this._elements.list = $(document.createElement('tbody')).appendTo(table);
        const tr = $(document.createElement('tr')).appendTo(thead);
        const columnTitles = ['Select', 'Index', 'Name', 'Age', 'Specialization', 'Year of university', 'Website', 'Phone', 'Edit', 'Delete'];
        let th;

        columnTitles.forEach(title => {
            th = $('<th/>', {text: title}).appendTo(tr);
        });

        return table;
    }

    static createStudentTR (studentObj) {
        const self = this;
        const tr = $(document.createElement('tr'));
        const editIcon = this._icons.edit.clone()
            .on('click', () => {
                self.constructor.clickEditIcon.call(self, tr);
            });
        const deleteIcon = this._icons.delete.clone()
            .on('click', () => {
                self.constructor.clickDeleteIcon.call(self, tr);
            });

        let td = $('<td/>', {'data-column': 'select'}).appendTo(tr);
        let key;

        td.append($('<input/>', {type: 'checkbox', name: 'select'}));

        // Create td with current tr index
        td = $('<td/>').appendTo(tr)[0].cellType = 'index';

        for (key in studentObj) {
            if (studentObj.hasOwnProperty(key) && !~key.indexOf('_')) {
                td = $('<td/>', {text: studentObj[key]}).appendTo(tr);
                td[0].cellType = '' + key;
            } else {
                tr[0][key] = studentObj[key];
            }
        }

        // Create td with edit button
        td = $('<td/>').appendTo(tr);
        td[0].cellType = 'editButton';
        td.append(editIcon);

        // Create td with delete button
        td = $('<td/>').appendTo(tr);
        td[0].cellType = 'deleteButton';
        td.append(deleteIcon);

        return tr;
    }

    static updateIndexes () {
        const rows = this._elements.list.children();

        rows.each((index, row) => {
            $(row).children().each((index, cell) => {
                if (cell.cellType === 'index') {
                    $(cell).text(row.rowIndex);
                    return false;
                }
            });
        });
    }

    static clickEditIcon (tr) {
        if (this.getStateChange()) {
            return;
        } else {
            this.setStateChange(true);
        }

        this.constructor.enableNoteEditing.call(this, tr);
    }

    static clickDeleteIcon (tr) {
        if (this.getStateChange()) {
            return;
        }

        const uniqueStudentId = tr[0]._studentId;
        this._deletingStudent = tr;

        this.constructor.showDeleteConfirm.call(this, uniqueStudentId);
    }

    static updateStudentsIndexes() {
        const rows = this._elements.list.children();
        const indexesData = rows.find('[data-column=index]');
        indexesData.each((index, el) => {
            $(el).text(index + 1);
        });
    }

    static enableNoteEditing (tr) {
        this._tempNoteCopy = $(tr).clone();
        let input;
        let inputText;
        const columnsForEdit = ['name', 'age', 'specialization', 'year', 'website', 'phone'];
        $(tr).children().each((index, column) => {
            column = $(column);
            if (columnsForEdit.includes(column.data('column'))) {
                // if (column.hasClass('is-editing')) {
                //     column.removeClass('editing');
                //     input = column.find('input');
                //     inputText = input.val();
                //     input.remove();
                //     column.text(inputText);
                // } else {
                    column.addClass('is-editing');
                    input = $(document.createElement('input'));
                    input.val(column.text());
                    input.width(column.width());
                    input.height(column.height());
                    column.text('');
                    input.appendTo(column);
                // }
            }
        });

        this.constructor.showEditingConfirm.call(this,tr);
    }

    static disableNoteEditing (tr) {
        if (this._tempNoteCopy === undefined) {
            throw Error('Viewmodel reference error: row temp copy is not defined');
        }
       $(tr).replaceWith(this._tempNoteCopy);
        this.setStateChange(false);
    }

    static showEditingConfirm(tr) {
        let saveChangesPopup = this._confirms.editStudent;

        if (saveChangesPopup === undefined) {
            saveChangesPopup = new SnackBar({
                name: 'saveStudentsChanges',
                keepAlive: false,
                timeout: false,
                message: ['save changes?'],
                confirm: true,
                progressbar: false,
                resolveText: 'Do it',
                rejectText: 'No, go back'
            });

            this._confirms.editStudent = saveChangesPopup;
            $(document.body).append(saveChangesPopup._snackbar);

            saveChangesPopup._resolveButton.on('click', () => (this.emit('editStudentRequest', index)));
            saveChangesPopup._rejectButton.on('click', () =>{
                this.constructor.disableNoteEditing.call(this, tr);
            });
        }

        setTimeout(saveChangesPopup.show.bind(saveChangesPopup), 10);
    }

    static showDeleteConfirm(id) {
        let deletePopup = this._confirms.removeStudent;

        if (deletePopup === undefined) {
            deletePopup = new SnackBar({
                name: 'deleteStudentNote',
                timeout: false,
                keepAlive: 5000,
                message: ['Are you sure?'],
                confirm: true,
                resolveText: 'Delete',
                rejectText: 'Cancel'
            });

            deletePopup._resolveButton.on('click', () => {
                this.setStateChange(true);
                this.emit('deleteStudentRequest', id);
            });

            this._confirms.removeStudent = deletePopup;
            $(document.body).append(deletePopup._snackbar);
        }

        setTimeout(deletePopup.show.bind(deletePopup), 10);
    }
}

class StudentController {
    constructor(model, view) {
        this._model = model;
        this._view = view;

    view.on('addStudentRequest', this.constructor.sendParsedStudent, this); // Input parameter is serialized Array of form elements
    view.on('deleteStudentRequest', model.deleteStudent, model); //Input parameter is student index

    model.on('studentAdded', view.addStudent, view); // Input parameter is parsed student object
    model.on('studentDeleted', view.removeStudent, view);  //Input parameter is student index
  }

  static sendParsedStudent (serializedData) {
    const studentObj = this.constructor.parseData(serializedData);
    this._model.addStudent(studentObj);
  }

  static parseData(data) {
    const studentObj = {};
    let i;
    let key;
    let value;

        for (i = 0; i < data.length; i++) {
            key = data[i].name;
            value = data[i].value;

            if (key === '' || value === '') {
                throw new Error('Controller Error: failure during data parse ')
            }

            studentObj[key] = value;
        }

        return studentObj;
    }
}

const studentsModel = new StudentsModel();
const studentsView = new StudentsView();
const studentsController = new StudentController(studentsModel, studentsView);

new Promise((resolve) => {
  studentsView.renderForm('#123');
  studentsView.renderTable('#123');
  resolve();
}).then(() => {
  studentsModel.uploadData('http://localhost:63342/Layout_sass/dist/studentsBase.json');
});





