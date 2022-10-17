import * as React from 'react';
import '../App.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';


export default function FileSystemNavigator() {

  
  return (
    <div>
      <h3>Tree view</h3>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ maxWidth: 150, textAlign: 'left' }}
      >
        <TreeItem
          nodeId="1"
          label="28_09_2022"
          onClick={(e) => {
            console.log(e.target.innerHTML);
          }}
        >
          <TreeItem
            nodeId="11"
            label="Page 001"
            onClick={(e) => {
              console.log(e.target.innerHTML);
            }}
          />
          <TreeItem nodeId="12" label="Page 002" />
          <TreeItem nodeId="13" label="Page 003" />
          <TreeItem nodeId="14" label="Page 004" />
          <TreeItem nodeId="15" label="Page 005" />
        </TreeItem>
        <TreeItem nodeId="2" label="29_09_2022">
          <TreeItem nodeId="21" label="PAge 001" />
          <TreeItem nodeId="22" label="PAge 002" />
          <TreeItem nodeId="23" label="PAge 002" />
        </TreeItem>
        <TreeItem nodeId="3" label="30_09_2022">
          <TreeItem nodeId="31" label="Page 001" />
          <TreeItem nodeId="32" label="Page 002" />
          <TreeItem nodeId="33" label="Page 003" />
          <TreeItem nodeId="34" label="Page 004" />
        </TreeItem>
      </TreeView>
    </div>
  );
}
