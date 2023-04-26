import { useLazyQuery } from '@apollo/client';
import { Button, Divider, Form, Input, Tag, Table, notification } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { InquiryDetailModal } from '../../components/InquiryDetailModal';
import { UserDetailModal } from '../../components/UserDetailModal';
import { InquiryType, productInquiryColumns } from '../../utils/columns';

export function ProductInquiry() {
  const [open, setOpen] = useState(false);
  const [detailModalopen, setDetailModalopen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [inquiryData, setInquiryData] = useState<any[]>([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRow = (data: InquiryType) => {
    setDetailModalopen(true);
    setModalData(data);
  };

  const handleCancelDetail = () => {
    setDetailModalopen(false);
  };

  const handleSearch = (values: { searchWord?: string }) => {
    // getInquiry({
    //   variables: {
    //     take,
    //     skip: 0,
    //     searchWord: values.searchWord,
    //   },
    // });
    setCurrent(1);
    setSkip(0);
    setSearchWord(values.searchWord ?? '');
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ take, skip })
    //     .then((data) => {
    //       setInquiryData(data.data.seeAllInquiryHistoryByAdmin.inquiries);
    //       setTotalCount(data.data.seeAllInquiryHistoryByAdmin.totalCount);
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  // get inquiry list
  // const [getInquiry, { loading, refetch }] = useLazyQuery<
  //   SeeAllInquiryHistoryByAdminResponse,
  //   SeeAllInquiryHistoryByAdminParams
  // >(SEE_ALL_INQUIRY_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setInquiryData(data.seeAllInquiryHistoryByAdmin.inquiries);
  //     setTotalCount(data.seeAllInquiryHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   getInquiry({
  //     variables: {
  //       skip,
  //       take,
  //       searchWord,
  //     },
  //   });
  // }, [skip, take]);

  return (
    <>
      <UserDetailModal
        handleCancel={handleCancel}
        open={open}
        email={modalData?.user?.email ?? ''}
      />
      <InquiryDetailModal
        data={modalData}
        open={detailModalopen}
        handleCancel={handleCancelDetail}
        refetch={handleRefetch}
      />
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search enterButton placeholder="검색어(문의내용, 작성자)" />
        </Form.Item>
      </Form>
      <Table
        columns={productInquiryColumns}
        dataSource={inquiryData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: 30,
        }}
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
        scroll={{ x: 800 }}
      />
    </>
  );
}
