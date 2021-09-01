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
        const button = new Button();
        this.button = button;
        const boxPane = new BoxPane();
        this.boxPane = boxPane;
        const button1 = new Button();
        this.button1 = button1;
        const button2 = new DropDownButton();
        this.button2 = button2;
        const tabbedPane = new TabbedPane();
        this.tabbedPane = tabbedPane;
        const radioButton = new RadioButton();
        this.radioButton = radioButton;
        const button3 = new DropDownButton();
        this.button3 = button3;
        const radioButton1 = new RadioButton();
        this.radioButton1 = radioButton1;
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
        surface.add(button);
        surface.add(boxPane);
        surface.add(tabbedPane);
        surface.add(dataGrid);
        boxPane.add(button1);
        boxPane.add(button2);
        tabbedPane.add(radioButton);
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
            button.text = 'button';
            button.element.style.left = '54px';
            button.element.style.top = '89px';
        }
        {
            boxPane.hgap = 10;
            boxPane.vgap = 10;
            boxPane.element.style.left = '55px';
            boxPane.element.style.width = '336px';
            boxPane.element.style.top = '167px';
            boxPane.element.style.height = '100px';
        }
        {
            button1.text = 'button1';
            button1.element.style.width = '143px';
        }
        {
            button2.text = 'button2';
            button2.element.style.width = '104px';
        }
        {
            tabbedPane.element.style.left = '168px';
            tabbedPane.element.style.width = '390px';
            tabbedPane.element.style.top = '302px';
            tabbedPane.element.style.height = '154px';
        }
        {
            radioButton.text = 'radioButton';
            radioButton.tab.title = 'Unnamed - 0';
            radioButton.tab.closable = true;
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
            dataGrid.element.style.left = '22px';
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
    }
}

export default KengaWidgets;