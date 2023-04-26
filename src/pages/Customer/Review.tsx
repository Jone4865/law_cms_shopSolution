import { useLazyQuery } from '@apollo/client';
import { Button, Form, Input, Tag, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { InquiryDetailModal } from '../../components/InquiryDetailModal';
import { UserDetailModal } from '../../components/UserDetailModal';
import { InquiryType, reviewColumns } from '../../utils/columns';

export function Review() {
  const [open, setOpen] = useState(false);
  const [detailModalopen, setDetailModalopen] = useState(false);
  const [modalData, setModalData] = useState<InquiryType>();
  const [inquiryData, setInquiryData] = useState<InquiryType[]>([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  const columns: ColumnsType<InquiryType> = [
    {
      title: 'no',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '문의 종류',
      key: 'inquiryKind',
      dataIndex: 'inquiryKind',
      align: 'center',
      render: (val) => {
        return val.name;
      },
    },
    {
      title: '문의내용',
      key: 'content',
      dataIndex: 'content',
      align: 'center',
    },
    {
      title: '닉네임',
      key: 'user',
      dataIndex: 'user',
      render: (val, record) => {
        return (
          <Button
            type="link"
            onClick={(e) => {
              setOpen(true);
              setModalData(record);
              e.stopPropagation();
            }}
          >
            {val.nickname}
          </Button>
        );
      },
      align: 'center',
    },
    {
      title: '접수일시',
      key: 'reportingDate',
      dataIndex: 'reportingDate',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD hh:mm');
      },
      align: 'center',
    },
    {
      title: '처리일시',
      key: 'processingDate',
      dataIndex: 'processingDate',
      render: (val, record) => {
        return record.reply ? moment(val).format('YYYY-MM-DD hh:mm') : '-';
      },
      align: 'center',
    },
    {
      title: '처리',
      key: 'isReply',
      dataIndex: 'reply',
      render: (val?: string) => {
        return val ? (
          <Tag color="blue">완료</Tag>
        ) : (
          <Tag color="error">미처리</Tag>
        );
      },
      align: 'center',
    },
  ];

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
          <Input.Search enterButton placeholder="검색어(내용, 작성자)" />
        </Form.Item>
      </Form>
      <Table
        columns={reviewColumns}
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
