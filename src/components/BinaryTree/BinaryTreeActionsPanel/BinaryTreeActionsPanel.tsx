import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { nanoid } from 'nanoid';

import { ActionField } from '../../ActionField';

import { TreeNode } from '../../../common/types';
import { BinaryTreeActionsPanelProps } from './types';

import { deepCopyObject } from '../../../common/utils';
import { addNode, deleteNode, traverseBFS } from './utils';

import styles from './BinaryTreeActionsPanel.module.scss';

const { binaryTreeActionsPanelContainer } = styles;

export const BinaryTreeActionsPanel: FC<BinaryTreeActionsPanelProps> = ({
  selectedNodeId,
  setSearchResultNodeId,
  setSelectedNodeId,
  setTree,
  tree,
}) => {
  const [nodeValue, setNodeValue] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchValue === 0) {
      setSearchResultNodeId(null);
    }
  }, [searchValue, setSearchResultNodeId]);

  useEffect(() => {
    if (errorMessage !== null) {
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }, [errorMessage]);

  const handleNodeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNodeValue(Number(event.target.value));
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(Number(event.target.value));
  };

  const handleAddNode = () => {
    const treeCopied = deepCopyObject<TreeNode>(tree as TreeNode);

    const newTreeNode = new TreeNode(nanoid(), nodeValue);

    try {
      addNode(newTreeNode, selectedNodeId, treeCopied);
    } catch (error) {
      const currentError = error as Error;

      setErrorMessage(currentError.message);
    }

    setTree(treeCopied);
    setSelectedNodeId(null);
    setNodeValue(0);
  };

  const handleDeleteNode = () => {
    const treeCopied = deepCopyObject<TreeNode>(tree as TreeNode);

    try {
      deleteNode(selectedNodeId, treeCopied);
    } catch (error) {
      const currentError = error as Error;

      setErrorMessage(currentError.message);
    }

    setTree(treeCopied);
    setSelectedNodeId(null);
  };

  const handleSearch = () => {
    let result;

    try {
      result = traverseBFS(tree as TreeNode, searchValue);
    } catch (error) {
      setSearchResultNodeId(null);

      const currentError = error as Error;

      setErrorMessage(currentError.message);
    }

    if (result) {
      setSearchResultNodeId(result.id);
    }
  };

  const isAddOrDeleteButtonDisabled = !selectedNodeId;
  const isSearchButtonDisabled = !searchValue;

  return (
    <Box className={binaryTreeActionsPanelContainer}>
      <ActionField
        buttonCaption="Add"
        fieldType="number"
        isDisabled={isAddOrDeleteButtonDisabled}
        label="Add Node"
        onChange={handleNodeValueChange}
        onClick={handleAddNode}
        value={nodeValue}
      />
      <ActionField
        buttonCaption="Search"
        fieldType="number"
        isDisabled={isSearchButtonDisabled}
        label="Search Node"
        onChange={handleSearchInputChange}
        onClick={handleSearch}
        value={searchValue}
      />
      <Button
        variant="contained"
        disabled={isAddOrDeleteButtonDisabled}
        onClick={handleDeleteNode}
        size="small"
      >
        Delete Node
      </Button>
      {errorMessage && (
        <Typography
          color="red"
          maxWidth="290px"
          lineHeight="30px"
          fontSize="16px"
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
