import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { UserDetailModal } from '../../components/UserDetailModal';
import { UserType, userListColumns } from '../../utils/columns';

export function Users() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<UserType>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState('');

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClickRow = (rec: UserType) => {
    setModalData(rec);
    setOpen(true);
  };

  const handleSearch = (value: { searchText?: string }) => {
    // seeAllUsers({
    //   variables: {
    //     take,
    //     skip: 0,
    //     ...value,
    //   },
    // });
    setSkip(0);
    setCurrent(1);
    setSearchText(value.searchText ?? '');
  };

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  // get user list
  // const [seeAllUsers, { loading }] = useLazyQuery<
  //   SeeUserHistoryByAdminResponse,
  //   SeeUserHistoryByAdminParams
  // >(SEE_USER_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setUserData(data.seeUserHistoryByAdmin.users);
  //     setTotalCount(data.seeUserHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   seeAllUsers({
  //     variables: {
  //       take,
  //       skip,
  //       searchText,
  //     },
  //   });
  // }, [skip, take]);

  return (
    <>
      <UserDetailModal
        open={open}
        handleCancel={handleCancel}
        email={modalData?.email ?? ''}
      />

      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="검색어(아이디(이메일), 닉네임, 이름, 휴대폰)"
            onSearch={(e) => {
              handleSearch({ searchText: e });
            }}
          />
        </Form.Item>
      </Form>
      <Table
        columns={userListColumns}
        dataSource={userData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        // loading={loading}
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
