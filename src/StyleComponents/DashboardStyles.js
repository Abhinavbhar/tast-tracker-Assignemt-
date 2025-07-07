// DashboardStyles.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;

  h1 {
    text-align: center;
    color: #333;
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    padding: 12px;
    font-size: 16px;
    background-color: #6200ee;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background-color: #4a00b3;
    }

    &:nth-child(4) {
      background-color: #aaa;
    }
  }
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;

  button {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    background-color: ${({ activeFilter, buttonType }) =>
      activeFilter === buttonType ? '#c0c0c0' : '#e8e8e8'};
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #d8d8d8;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const TaskItem = styled.li`
  background-color: ${({ completed }) => (completed ? '#d4ffd4' : '#fff')};
  border: 1px solid #ccc;
  padding: 14px;
  border-left: 5px solid ${({ completed }) => (completed ? 'green' : 'gray')};
  border-radius: 8px;
  margin-bottom: 14px;

  .task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-title {
    flex: 1;
    font-weight: 600;
    margin-left: 10px;
    color: #333;
  }

  .task-actions {
    display: flex;
    gap: 8px;
  }

  .task-desc {
    margin: 8px 0;
    color: #555;
  }

  .task-time {
    color: #888;
    font-size: 12px;
  }
`;

export const FilterButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  background-color: ${({ active }) => (active ? '#c0c0c0' : '#e8e8e8')};
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d8d8d8;
  }
`;

