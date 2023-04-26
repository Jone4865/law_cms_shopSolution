import { Button, Divider, Form, Input, notification, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { PolicyDetailModal } from '../../components/PolicyDetailModal';
import TransformBox from '../../components/TransformBox';
import { PolicyType, policyColumns } from '../../utils/columns';

export function Policy() {
  const [policyData, setPolicyData] = useState<PolicyType[]>([]);
  const [policyKind, setPolicyKind] = useState<KindType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState<PolicyType>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchWord, setSearchWord] = useState('');

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleClick = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleRow = (record: PolicyType) => {
    setOpen(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch()
    //     .then((data) => {
    //       setPolicyData(data.data.seePolicyHistoryByAdmin.policies);
    //       setTotalCount(data.data.seePolicyHistoryByAdmin.totalCount);
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  const handleSearch = (value: { searchWord?: string }) => {
    // getPolicies({
    //   variables: {
    //     searchWord: value.searchWord,
    //     skip: 0,
    //     take,
    //   },
    // });
    setSkip(0);
    setCurrent(1);
    setSearchWord(value.searchWord ?? '');
  };

  // get policy list
  // const [getPolicies, { refetch, loading }] = useLazyQuery<
  //   SeePolicyHistoryByAdminResponse,
  //   SeePolicyHistoryByAdminParams
  // >(SEE_POLICY_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setPolicyData(data.seePolicyHistoryByAdmin.policies);
  //     setTotalCount(data.seePolicyHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // get policy kind list
  // useQuery<SeePolicyKindResponse>(SEE_POLICY_KIND, {
  //   onCompleted: (data) => {
  //     setPolicyKind(data.seePolicyKind);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   getPolicies({
  //     variables: {
  //       skip,
  //       take,
  //       searchWord,
  //     },
  //   });
  // }, [take, skip]);

  return (
    <>
      <PolicyDetailModal
        data={modalData}
        handleCancel={handleCancel}
        open={open}
        isEdit={isEdit}
        refetch={handleRefetch}
        policyKind={policyKind}
      />

      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(종류, 내용)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          약관 등록
        </Button>
      </TransformBox>

      <Table
        columns={policyColumns}
        dataSource={policyData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
        style={{
          marginTop: '30px',
        }}
      />
    </>
  );
}
