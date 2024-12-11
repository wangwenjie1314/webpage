import { set } from 'lodash-es'
import { useObservable } from 'rxjs-hooks'
import { NOUI } from 'tenn-web/no-ui/src'
import { Err } from '../former/err'
import { Label } from '../former/label'
import { Wrap } from '../former/wrap'
import dayjs from 'dayjs'
import { DatePicker, LocaleProvider, Space } from '@douyinfe/semi-ui'
import type { DatePickerProps } from '@douyinfe/semi-ui/lib/es/datePicker'
import { IconBulb } from '@douyinfe/semi-icons'
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US'
import { useRef } from 'react'
import { Medias } from '@/@media'

/**
 * 日期组件
 * - only date: douyinProp.showTime: false
 */
export function Single(p: {
    //
    ctrl: NOUItype.form<any>
    field: string
    douyinProp?: DatePickerProps
    placeholder?: string
    label?: string
    onMergeAfter?: (merged_value: any) => void
    /** default: [click, change] */
    autoClearErr?: ('click' | 'change')[]
    /**
     * no label and err
     * - default: false
     */
    inputOnly?: boolean
    layout?: 'horizontal' | 'vertical'
}) {
    const about = useObservable(() => p.ctrl.field$(p.field))

    const label = p.label ?? NOUI.Form.field_label(p.field)
    const required = about?.required ?? false
    const disabled = about?.disabled ?? false
    const placeholder = p.placeholder ?? NOUI.Form.require_msg(p.field, 'select')

    const maybe_err = about?.check_res.filter((it) => it.well === false).at(0) || undefined
    const autoClearErr = p.autoClearErr ?? ['click', 'change']
    const layout = p.layout ?? 'horizontal'
    const inputer = (
        <LocaleProvider locale={en_US}>
            <DatePicker
                // showNow={false}
                value={about?.value}
                onChange={(date: any, dateString: string | string[] | Date | Date[] | undefined) => {
                    if (disabled) return
                    NOUI.Form.hand.value_merge({
                        ctrl: p.ctrl,
                        change(f) {
                            set(f, p.field, dateString)
                        },
                    })
                    if (autoClearErr.includes('change')) {
                        p.ctrl.clear_field_err(p.field)
                    }
                    p.onMergeAfter?.(dateString)
                }}
                // onClick={(e: any) => {
                //     if (autoClearErr.includes('click')) {
                //         p.ctrl.clear_field_err(p.field)
                //     }
                //     // if (p.douyinProp?.onClick) {
                //     //     p.douyinProp.onClick(e)
                //     // }
                // }}
                placeholder={placeholder}
                disabled={disabled}
                {...p.douyinProp}
                // status={maybe_err ? 'error' : undefined}
                validateStatus={maybe_err ? 'error' : 'default'}
            />
        </LocaleProvider>
    )
    if (p.inputOnly) {
        return inputer
    }

    return (
        <Wrap
            layout={layout}
            label={<Label layout={layout} label={label} require={required} />}
            err={<Err err={maybe_err?.err} />}
            input={inputer}
        ></Wrap>
    )
}

/**
 * 日期插件-区间选择
 */
export function Range(p: {
    //
    ctrl: NOUItype.form<any>
    field: string
    douyinProp?: DatePickerProps
    placeholder?: [string, string]
    label?: string
    onMergeAfter?: (merged_value: any) => void
    /** default: [click, change] */
    autoClearErr?: ('click' | 'change')[]
    /**
     * no label and err
     * - default: false
     */
    inputOnly?: boolean
    /**
     *
     * -  horizontal
     */
    layout?: 'horizontal' | 'vertical'
}) {
    const about = useObservable(() => p.ctrl.field$(p.field))

    const label = p.label ?? NOUI.Form.field_label(p.field)
    const required = about?.required ?? false
    const placeholder = p.placeholder ?? ['Start date', 'End date']
    const disabled = about?.disabled ?? false

    const maybe_err = about?.check_res.filter((it) => it.well === false).at(0) || undefined
    const autoClearErr = p.autoClearErr ?? ['click', 'change']
    const layout = p.layout || 'horizontal'
    // 底部友好提醒
    // const BottomSlot = function () {
    //     return (
    //         <Space style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between' }}>
    //             <div>
    //                 <IconBulb style={{ color: 'rgba(var(--semi-amber-5), 1)' }} />
    //                 <span>Click on the blank space to close the datetime range selector</span>
    //             </div>
    //             {/* <div>
    //                 {about?.value.join('').length > 0 && <span className="text-[#2a65fd] cursor-pointer" onClick={(e) => {
    //                     // 点击Clear
    //                     setTimeout(() => {
    //                         const cur: any = dateRef.current
    //                         if (cur) {
    //                             cur.foundation.handleRangeInputClear(e);
    //                             cur.foundation._adapter.setRangeInputFocus('rangeStart')
    //                         }
    //                     }, 0)
    //                 }}>Clear</span>}
    //             </div> */}
    //         </Space>
    //     )
    // }
    const dateRef = useRef()
    const flag = Array.isArray(about?.value) && about?.value.join('').length > 0
    const initialValueRef = useRef<any>(null)

    const inputer = (
        <LocaleProvider locale={en_US}>
            <DatePicker
                ref={dateRef as React.RefObject<any>}
                type="dateTimeRange"
                className="h-12 w-full"
                // 自定义触发输入框
                // flag 判断是否选择过日期
                triggerRender={() => (
                    <div className="flex h-full items-center px-3">
                        <div className="flex w-full flex-1">
                            {flag && (
                                <>
                                    <div className="w-1/2 text-sm text-black">{about?.value[0]}</div>
                                    <div className="w-1/2 text-sm text-black">{about?.value[1]}</div>
                                </>
                            )}
                            {!flag && (
                                <>
                                    <div className="w-1/2 text-sm text-[rgba(3,11,32,0.3)]">{placeholder[0]}</div>
                                    <div className="w-1/2 text-sm text-[rgba(3,11,32,0.3)]">{placeholder[1]}</div>
                                </>
                            )}
                        </div>
                        <div className={'flex h-6 w-6 cursor-pointer items-center justify-center'}>
                            {flag && (
                                <img
                                    src={Medias.svgs.clear}
                                    onClick={(e) => {
                                        e && e.stopPropagation()
                                        // 当clear点击时
                                        NOUI.Form.hand.value_merge({
                                            ctrl: p.ctrl,
                                            change(f) {
                                                set(f, p.field, [null, null])
                                            },
                                        })
                                    }}
                                    className={'h-5 w-5'}
                                    alt=""
                                />
                            )}
                            {!flag && <img src={Medias.svgs.date} className={'h-5 w-5'} alt="" />}
                        </div>
                    </div>
                )}
                // showNow={false}
                defaultPickerValue={[dayjs().startOf('day').toDate(), dayjs().add(1, 'month').endOf('day').toDate()]} // 默认选择日期区间是当天和一月后的
                // bottomSlot={<BottomSlot />}
                value={about?.value}
                onOpenChange={(isOpen: boolean) => {
                    // 无论是点击开始还是结束日期触发日期选择组件打开时 焦点都是Start
                    if (isOpen) {
                        initialValueRef.current = about?.value
                        setTimeout(() => {
                            const cur: any = dateRef.current
                            if (cur) {
                                cur.foundation._adapter.setRangeInputFocus('rangeStart')
                            }
                        }, 0)
                    }
                }}
                needConfirm={true}
                onCancel={() => {
                    // 将值重置回去
                    NOUI.Form.hand.value_merge({
                        ctrl: p.ctrl,
                        change(f) {
                            set(f, p.field, initialValueRef.current)
                        },
                    })
                }}
                onConfirm={(date: any, dateString: string | string[] | Date | Date[] | undefined) => {
                    const newValue: any[] = Array.isArray(dateString) ? dateString : [null, null]
                    p.onMergeAfter?.(newValue)
                }}
                onChange={(date: any, dateString: string | string[] | Date | Date[] | undefined) => {
                    const newValue: any[] = Array.isArray(dateString) ? dateString : [null, null]

                    NOUI.Form.hand.value_merge({
                        ctrl: p.ctrl,
                        change(f) {
                            set(f, p.field, newValue)
                        },
                    })
                    if (autoClearErr.includes('change')) {
                        p.ctrl.clear_field_err(p.field)
                    }
                }}
                placeholder={placeholder}
                disabled={disabled}
                // status={maybe_err ? 'error' : undefined}
                validateStatus={maybe_err ? 'error' : 'default'}
                {...p.douyinProp}
            />
        </LocaleProvider>
    )
    if (p.inputOnly) {
        return inputer
    }
    return (
        <Wrap
            layout={layout}
            label={<Label label={label} layout={layout} require={required} />}
            err={<Err err={maybe_err?.err} />}
            input={inputer}
        ></Wrap>
    )
}
