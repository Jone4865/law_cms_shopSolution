import { Button, Divider, Form, Input, notification, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import * as S from './style';

import { AdminDetailModal } from '../../components/AdminDetailModal';
import { OtpInputModal } from '../../components/OtpInputModal';
import { OtpQrModal } from '../../components/OtpQrModal';
import TransformBox from '../../components/TransformBox';
import { AuthDescType, authDescColumns } from '../../utils/columns';
import { AdminType } from '../../utils/columns/admin';

export function Admin() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<AdminType>();
  const [adminData, setAdminData] = useState<AdminType[]>([]);
  const [adminAuths, setAdminAuths] = useState<KindType[]>([]);
  const [secret, setSecret] = useState('');
  const [otpModalopen, setOtpModalopen] = useState(false);
  const [qrModalopen, setQrModalopen] = useState(false);
  const [email, setEmail] = useState('');
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [authDescData, setAuthDescData] = useState<AuthDescType[]>([]);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const columns: ColumnsType<AdminType> = [
    {
      title: '이메일',
      key: 'email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '이름',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '권한',
      key: 'adminRoles',
      dataIndex: 'adminRoles',
      render: (val) => {
        return (
          <TransformBox alignItems="center" flexDirection="column">
            {val.map((v: AdminType) => {
              return <div>{v.name}</div>;
            })}
          </TransformBox>
        );
      },
      align: 'center',
    },
    {
      title: 'OTP 설정',
      key: 'OTP',
      dataIndex: 'otpSecret',
      render: (val, record) => {
        return (
          <S.OtpWrap>
            {val?.length ? (
              <Tag
                color="green"
                style={{
                  margin: 0,
                }}
              >
                설정 완료
              </Tag>
            ) : (
              <Tag
                color="error"
                style={{
                  margin: 0,
                }}
              >
                설정 미완료
              </Tag>
            )}

            <Button
              type="primary"
              size="small"
              style={{
                marginTop: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setEmail(record.email);
                setQrModalopen(true);
              }}
            >
              {val?.length ? '재설정' : '설정'}
            </Button>
          </S.OtpWrap>
        );
      },
      align: 'center',
    },
    {
      title: '생성일',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD hh:mm');
      },
      align: 'center',
    },
    {
      title: '수정일',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD hh:mm');
      },
      align: 'center',
    },
  ];

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
    setModalData(undefined);
  };

  const handleRow = (record: AdminType) => {
    setOpen(true);
    setModalData(record);
  };

  const handleCancelOtp = () => {
    setOtpModalopen(false);
  };

  const handleCancelQr = () => {
    setQrModalopen(false);
  };

  const handleNext = () => {
    handleCancelQr();
    setOtpModalopen(true);
  };

  const handleFinish = (otp: string[]) => {
    // setOtpSecret({
    //   variables: {
    //     email,
    //     otpSecret: secret,
    //     code: otp.concat().join().replaceAll(',', ''),
    //   },
    // });
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch()
    //     .then((data) => {
    //       setAdminData(data.data.seeAdminHistoryByAdmin.admins);
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  const handleSearch = (value: { searchWord?: string }) => {
    // getAllAdmins({
    //   variables: {
    //     take,
    //     skip: 0,
    //     ...value,
    //   },
    // });
    setSkip(0);
    setCurrent(1);
    setSearchWord(value.searchWord ?? '');
  };

  // get admin list
  // const [getAllAdmins, { refetch, loading }] = useLazyQuery<
  //   SeeAdminHistoryByAdminResponse,
  //   SeeAdminHistoryByAdminParams
  // >(SEE_ADMIN_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setAdminData(data.seeAdminHistoryByAdmin.admins);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // get admin roles
  // useQuery<SeeAdminRoleResponse>(SEE_ADMIN_ROLE, {
  //   onCompleted: (data) => {
  //     setAdminAuths(data.seeAdminRole);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // update admin otpSecret
  // const [setOtpSecret, { loading: otpLoading }] = useMutation<
  //   UpdateOtpSecretResponse,
  //   UpdateOtpSecretParams
  // >(UPDATE_OTP_SECRET, {
  //   onCompleted: () => {
  //     notification.success({ message: 'OTP를 재설정했습니다.' });
  //     handleCancelOtp();
  //     handleRefetch();
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //     setOtp((prev) => {
  //       if (prev.length) {
  //         prev.map((_v, i) => (prev[i] = ''));
  //       }
  //       return [...prev];
  //     });
  //     handleFocus(0);
  //   },
  // });

  //pagination
  // useEffect(() => {
  //   getAllAdmins({
  //     variables: {
  //       take,
  //       skip,
  //       searchWord,
  //     },
  //   });
  // }, [take, skip]);

  // create admin roles description
  // useEffect(() => {
  //   getAdminAuthDesc();
  // }, [adminAuths]);

  return (
    <>
      <AdminDetailModal
        open={open}
        handleCancel={handleCancel}
        admin={modalData}
        refetch={handleRefetch}
        adminRoles={adminAuths}
      />
      <OtpQrModal
        open={qrModalopen}
        handleCancel={handleCancelQr}
        handleNext={handleNext}
        email={email}
        otpSecret={secret}
        setOtpSecret={setSecret}
      />
      <OtpInputModal
        loading={false}
        open={otpModalopen}
        onCancel={handleCancelOtp}
        handleFinish={handleFinish}
      />
      <Form
        layout="inline"
        onFinish={handleSearch}
        style={{
          marginBottom: 30,
        }}
      >
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(이메일, 이름, 연락처)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form>

      <TransformBox justifyContent="flex-end" marginBottom={'30px'}>
        <Button type="primary" onClick={handleClick}>
          관리자 생성
        </Button>
      </TransformBox>

      <Table
        columns={columns}
        dataSource={adminData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        rowKey={(rec) => rec.email}
        // loading={loading}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        style={{
          marginBottom: 30,
        }}
        scroll={{ x: 1000 }}
      />
      <h3>권한 설명</h3>
      <Table
        columns={authDescColumns}
        dataSource={authDescData}
        pagination={false}
        rowKey={(rec) => rec.name}
        scroll={{ x: 800 }}
      />
    </>
  );
}
