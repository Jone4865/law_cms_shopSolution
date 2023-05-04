import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { UserDetailModal } from '../../components/UserDetailModal';
import { userDeleteColumns } from '../../utils/columns';
import {
  findManyUser,
  findManyUserVariables,
} from '../../graphql/generated/findManyUser';
import { FIND_MANY_USER } from '../../graphql/query/findManyUser';
import { UserStatus } from '../../graphql/generated/graphql-global-types';

export function UserDelete() {
  const [userData, setUserData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [take, setTake] = useState(10);
  const [cursorId, setCursorId] = useState('');

  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchWord, setSearchWord] = useState('');

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClickRow = (rec: any) => {
    setModalData(rec);
    setOpen(true);
  };

  // const handleSearch = (value: { searchWord?: string }) => {
  //   // seeAllUsers({
  //   //   variables: {
  //   //     take,
  //   //     skip: 0,
  //   //     ...value,
  //   //   },
  //   // });
  //   setSkip(0);
  //   setCurrent(1);
  //   setSearchWord(value.searchWord ?? '');
  // };

  const handlePagination = (e: number) => {
    const idx = userData.length - 1;
    setCursorId(userData[idx].id);
    setCurrent(e);
  };

  const [findManyUser, { loading }] = useLazyQuery<
    findManyUser,
    findManyUserVariables
  >(FIND_MANY_USER, {
    onCompleted: (data) => {
      setUserData(data.findManyUser.users);
      setTotalCount(data.findManyUser.totalCount);
    },
    onError: (e) => {
      notification.error({ message: e.message });
    },
    fetchPolicy: 'no-cache',
  });

  // pagination
  useEffect(() => {
    findManyUser({
      variables: {
        take,
        cursorId,
        userStatus: UserStatus.WITHDRAWAL,
      },
    });
  }, [cursorId, take, findManyUser]);

  return (
    <>
      <UserDetailModal
        open={open}
        handleCancel={handleCancel}
        email={modalData?.email ?? ''}
      />

      {/* <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(아이디(이메일), 닉네임, 이름, 휴대폰)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form> */}
      <Table
        columns={userDeleteColumns}
        dataSource={userData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        loading={loading}
        style={{
          marginTop: 30,
        }}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
        rowKey={(rec) => rec.email}
        scroll={{ x: 800 }}
      />
    </>
  );
}
