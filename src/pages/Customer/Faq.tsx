import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Divider, Form, Input, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { FaqDetailModal } from '../../components/FaqDetailModal';
import TransformBox from '../../components/TransformBox';
import { FaqType, faqColumns } from '../../utils/columns';

export function Faq() {
  const [faqData, setFaqData] = useState<FaqType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState<FaqType>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [faqKind, setFaqKind] = useState<KindType[]>([]);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleClick = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleRow = (record: FaqType) => {
    setOpen(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ searchText, skip, take })
    //     .then((data) => {
    //       setFaqData(data.data.seeFaqHistoryByAdmin.faqs);
    //       setTotalCount(data.data.seeFaqHistoryByAdmin.totalCount);
    //       if (
    //         data.data.seeFaqHistoryByAdmin.faqs.length === 0 &&
    //         data.data.seeFaqHistoryByAdmin.totalCount > 0
    //       ) {
    //         setSkip(skip - take);
    //       }
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  const handleSearch = (value: { searchText?: string }) => {
    // getFaqs({
    //   variables: {
    //     take,
    //     skip: 0,
    //     ...value,
    //   },
    // });
    setCurrent(1);
    setSkip(0);
    setSearchText(value.searchText ?? '');
  };

  // get faq list
  // const [getFaqs, { loading, refetch }] = useLazyQuery<
  //   SeeFaqHistoryByAdminResponse,
  //   SeeFaqHistoryByAdminParams
  // >(SEE_FAQ_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setFaqData(data.seeFaqHistoryByAdmin.faqs);
  //     setTotalCount(data.seeFaqHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // get faq kind list
  // useQuery<SeeFaqKindResponse>(SEE_FAQ_KIND, {
  //   onCompleted: (data) => {
  //     setFaqKind(data.seeFaqKind);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   getFaqs({
  //     variables: {
  //       skip,
  //       take,
  //       searchText,
  //     },
  //   });
  // }, [skip, take]);

  return (
    <>
      <FaqDetailModal
        open={open}
        data={modalData}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
        faqKind={faqKind}
      />
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchText">
          <Input.Search
            enterButton
            placeholder="검색어(질문)"
            onSearch={(e) => {
              handleSearch({
                searchText: e,
              });
            }}
          />
        </Form.Item>
      </Form>
      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          FAQ 등록
        </Button>
      </TransformBox>
      <Table
        columns={faqColumns}
        dataSource={faqData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginTop: '30px',
        }}
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
