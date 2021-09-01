import Button from 'kenga-buttons/button';
import DropDownButton from 'kenga-buttons/drop-down-button';
import RadioButton from 'kenga-buttons/radio-button';
import AnchorsPane from 'kenga-containers/anchors-pane';
import BoxPane from 'kenga-containers/box-pane';
import TabbedPane from 'kenga-containers/tabbed-pane';
import ColumnNode from 'kenga-grid/columns/column-node';
import CheckBoxServiceNode from 'kenga-grid/columns/nodes/check-box-service-node';
import Grid from 'kenga-grid/grid';

class KengaWidgets {
    constructor () {
        const surface = new AnchorsPane();
        this.surface = surface;
        const boxPane = new BoxPane();
        this.boxPane = boxPane;
        const button1 = new Button();
        this.button1 = button1;
        const button2 = new DropDownButton();
        this.button2 = button2;
        const tabbedPane = new TabbedPane();
        this.tabbedPane = tabbedPane;
        const button3 = new DropDownButton();
        this.button3 = button3;
        const radioButton1 = new RadioButton();
        this.radioButton1 = radioButton1;
        const radioButton = new RadioButton();
        this.radioButton = radioButton;
        const dataGrid = new Grid();
        this.dataGrid = dataGrid;
        const column = new ColumnNode();
        this.column = column;
        const column1 = new CheckBoxServiceNode();
        this.column1 = column1;
        const column2 = new ColumnNode();
        this.column2 = column2;
        const column5 = new ColumnNode();
        this.column5 = column5;
        const column6 = new ColumnNode();
        this.column6 = column6;
        const column7 = new ColumnNode();
        this.column7 = column7;
        const button = new Button();
        this.button = button;
        const button4 = new Button();
        this.button4 = button4;
        const button5 = new Button();
        this.button5 = button5;
        const button51 = new Button();
        this.button51 = button51;
        surface.add(boxPane);
        surface.add(tabbedPane);
        surface.add(radioButton);
        surface.add(dataGrid);
        surface.add(button);
        surface.add(button4);
        surface.add(button5);
        surface.add(button51);
        boxPane.add(button1);
        boxPane.add(button2);
        tabbedPane.add(button3);
        tabbedPane.add(radioButton1);
        dataGrid.addColumnNode(column);
        dataGrid.addColumnNode(column1);
        dataGrid.addColumnNode(column2);
        dataGrid.addColumnNode(column7);
        column2.addColumnNode(column5);
        column2.addColumnNode(column6);
        {
            surface.element.style.width = '500px';
            surface.element.style.height = '900px';
        }
        {
            boxPane.hgap = 10;
            boxPane.vgap = 10;
            boxPane.element.style.left = '46px';
            boxPane.element.style.width = '336px';
            boxPane.element.style.top = '148px';
            boxPane.element.style.height = '100px';
        }
        {
            button1.text = 'button1';
            button1.element.style.width = '106px';
        }
        {
            button2.text = 'button2';
            button2.element.style.width = '104px';
        }
        {
            tabbedPane.element.style.left = '68px';
            tabbedPane.element.style.width = '390px';
            tabbedPane.element.style.top = '302px';
            tabbedPane.element.style.height = '154px';
        }
        {
            button3.text = 'button3';
            button3.tab.title = 'Unnamed - 1';
            button3.tab.closable = true;
        }
        {
            radioButton1.text = 'radioButton1';
            radioButton1.tab.title = 'Unnamed - 2';
            radioButton1.tab.closable = true;
        }
        {
            radioButton.text = 'radioButton';
            radioButton.selected = true;
            radioButton.element.style.left = '19px';
            radioButton.element.style.top = '31px';
        }
        {
            dataGrid.evenRowsColor = '#3d35d0';
            dataGrid.rowsHeight = '35';
            dataGrid.headerRowsHeight = '31';
            dataGrid.indent = '30';
            dataGrid.element.style.left = '21px';
            dataGrid.element.style.width = '453px';
            dataGrid.element.style.top = '491px';
            dataGrid.element.style.height = '221px';
        }
        {
            column.title = 'column';
        }
        {
            column2.title = 'column2';
        }
        {
            column5.title = 'column5';
            column5.width = 91;
        }
        {
            column6.title = 'column6';
            column6.width = 103;
        }
        {
            column7.title = 'column7';
        }
        {
            button.text = 'button111';
            button.element.style.left = '30px';
            button.element.style.top = '70px';
        }
        {
            button4.text = 'button111';
            button4.element.style.left = '43px';
            button4.element.style.top = '101px';
        }
        {
            button5.text = 'button111';
            button5.element.style.left = '145px';
            button5.element.style.top = '78px';
        }
        {
            button51.text = 'button111';
            button51.element.style.left = '165px';
            button51.element.style.top = '98px';
        }
    }
}

export default KengaWidgets;